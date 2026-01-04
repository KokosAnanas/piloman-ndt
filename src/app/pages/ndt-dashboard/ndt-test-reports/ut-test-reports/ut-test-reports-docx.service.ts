import { Injectable } from '@angular/core';

// Типы данных формы для генерации DOCX
export interface UtConclusionFormValue {
    labName: string;
    attestationNumber: string;
    normativeDocument: string;
    otkNumber: string;
    defectoscope: string;
    transducers: string;
    calibrationBlock: string;
    vikConclusionNumber: string;
    vikConclusionDate: Date | null;

    objectName: string;
    qualityLevel: 'A' | 'B' | 'C';
    controlVolume: number | null;
    routeName: string;
    pipelineSection: string;
    contractor: string;
    customer: string;
    welderCode: string;

    conclusionNumber: string;
    conclusionDate: Date | null;

    defects: DefectRowValue[];

    finalConclusion: 'годен' | 'ремонт' | 'вырезать';

    inspector: SignatureValue;
    approver: SignatureValue;
}

export interface DefectRowValue {
    weldNumber: string;
    diameter: number | null;
    thickness: number | null;
    defectNumber: number | null;
    defectArea: number | null;
    sensitivityCorrection: number | null;
    length: number | null;
    height: number | null;
    depth: number | null;
    totalLength: number | null;
    perimeterCoord: number | null;
    conclusion: 'годен' | 'ремонт' | 'вырезать';
    notes: string;
}

export interface SignatureValue {
    fullName: string;
    qualification: string;
    date: Date | null;
}

// Названия месяцев в родительном падеже
const MONTHS_GENITIVE = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

// Утилиты для форматирования
function formatRuDate(date: Date | null): string {
    if (!date) return '«____» ______________ 20____ года';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = MONTHS_GENITIVE[d.getMonth()];
    const year = d.getFullYear();
    return `«${day}» ${month} ${year} года`;
}

function formatShortDate(date: Date | null): string {
    if (!date) return '__________';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

function v(value: string | undefined | null, fallback = '__________'): string {
    return value?.trim() || fallback;
}

function num(value: number | undefined | null, fallback = '___'): string {
    return value !== null && value !== undefined ? String(value) : fallback;
}

@Injectable({
    providedIn: 'root'
})
export class UtTestReportsDocxService {
    async buildDocx(formValue: UtConclusionFormValue): Promise<Blob> {
        // Динамический импорт для уменьшения бандла
        const {
            Document,
            Packer,
            Paragraph,
            Table,
            TableCell,
            TableRow,
            TextRun,
            WidthType,
            AlignmentType,
            BorderStyle,
            VerticalAlign,
            PageOrientation,
            convertMillimetersToTwip,
            Header
        } = await import('docx');

        const FONT = 'Times New Roman';
        const FONT_SIZE = 20; // 10pt = 20 half-points

        // Создание ячейки таблицы с текстом
        const createCell = (
            text: string,
            options: {
                width?: number;
                bold?: boolean;
                italic?: boolean;
                fontSize?: number;
                alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
                colSpan?: number;
                rowSpan?: number;
                borders?: {
                    top?: boolean;
                    bottom?: boolean;
                    left?: boolean;
                    right?: boolean;
                };
                noBorders?: boolean;
            } = {}
        ) => {
            const borderStyle = {
                style: BorderStyle.SINGLE,
                size: 1,
                color: '000000'
            };
            const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

            let borders;
            if (options.noBorders) {
                borders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
            } else if (options.borders) {
                borders = {
                    top: options.borders.top !== false ? borderStyle : noBorder,
                    bottom: options.borders.bottom !== false ? borderStyle : noBorder,
                    left: options.borders.left !== false ? borderStyle : noBorder,
                    right: options.borders.right !== false ? borderStyle : noBorder
                };
            } else {
                borders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };
            }

            return new TableCell({
                width: options.width ? { size: options.width, type: WidthType.DXA } : undefined,
                columnSpan: options.colSpan,
                rowSpan: options.rowSpan,
                verticalAlign: VerticalAlign.CENTER,
                borders,
                children: [
                    new Paragraph({
                        alignment: options.alignment || AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text,
                                font: FONT,
                                size: options.fontSize || FONT_SIZE,
                                bold: options.bold,
                                italics: options.italic
                            })
                        ]
                    })
                ]
            });
        };

        // Создание ячейки с несколькими строками текста
        const createMultilineCell = (
            lines: { text: string; bold?: boolean; italic?: boolean }[],
            options: {
                width?: number;
                alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
                colSpan?: number;
                rowSpan?: number;
                noBorders?: boolean;
            } = {}
        ) => {
            const borderStyle = {
                style: BorderStyle.SINGLE,
                size: 1,
                color: '000000'
            };
            const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
            const borders = options.noBorders
                ? { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder }
                : { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

            const textChildren: InstanceType<typeof TextRun>[] = [];
            lines.forEach((line, index) => {
                if (index > 0) {
                    textChildren.push(new TextRun({ break: 1 }));
                }
                textChildren.push(
                    new TextRun({
                        text: line.text,
                        font: FONT,
                        size: FONT_SIZE,
                        bold: line.bold,
                        italics: line.italic
                    })
                );
            });

            return new TableCell({
                width: options.width ? { size: options.width, type: WidthType.DXA } : undefined,
                columnSpan: options.colSpan,
                rowSpan: options.rowSpan,
                verticalAlign: VerticalAlign.CENTER,
                borders,
                children: [
                    new Paragraph({
                        alignment: options.alignment || AlignmentType.LEFT,
                        children: textChildren
                    })
                ]
            });
        };

        // ============================== Верхний колонтитул: СТО Газпром ========================================
        // Документация: https://docx.js.org/#/usage/headers-and-footers
        const header = new Header({
            children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun({ text: 'СТО Газпром 15-1.3-004-2023', font: FONT, size: FONT_SIZE }),
                        new TextRun({ break: 1 }),
                        new TextRun({ text: 'Приложение Г.3', font: FONT, size: FONT_SIZE })
                    ]
                })
            ]
        });

        // ========== Верхние два блока (две таблицы в одной строке) ==========
        // Левая таблица - Лаборатория
        const leftTableWidth = 7200; // ~127mm

        const leftTable = new Table({
            width: { size: leftTableWidth, type: WidthType.DXA },
            rows: [
                new TableRow({
                    children: [
                        createCell('Наименование лаборатории НК:', { width: 3200 }),
                        createCell(v(formValue.labName, 'Наименование лаборатории НК'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Свидетельство об аттестации №', { width: 3200 }),
                        createCell(v(formValue.attestationNumber, 'Свидетельство об аттестации'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Нормативный документ:', { width: 3200 }),
                        createCell(v(formValue.normativeDocument, 'СТО Газпром 15-1.3-004-2023; СТО Газпром 15-2.3–005–2023'), { width: 4000 })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Номер ОТК НК:', { width: 3200 }),
                        createCell(v(formValue.otkNumber, 'Номер ОТК НК'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Средства контроля', { width: 3200, rowSpan: 3 }),
                        createMultilineCell(
                            [
                                { text: 'Дефектоскоп (тип/марка, заводской/серийный номер);', italic: true },
                                { text: v(formValue.defectoscope, ''), italic: true }
                            ],
                            { width: 4000 }
                        )
                    ]
                }),
                new TableRow({
                    children: [
                        createMultilineCell(
                            [
                                { text: 'Типы, номер применяемых преобразователей или акустических блоков;', italic: true },
                                { text: v(formValue.transducers, ''), italic: true }
                            ],
                            { width: 4000 }
                        )
                    ]
                }),
                new TableRow({
                    children: [
                        createMultilineCell(
                            [
                                { text: 'Номер НО (калибровочного блока), форма и размер искусственного отражателя', italic: true },
                                { text: v(formValue.calibrationBlock, ''), italic: true }
                            ],
                            { width: 4000 }
                        )
                    ]
                }),
                new TableRow({
                    children: [
                        createCell(`Заключение по ВИК № ${v(formValue.vikConclusionNumber, '____')} от ${formatShortDate(formValue.vikConclusionDate)}`, {
                            width: 7200,
                            colSpan: 2
                        })
                    ]
                })
            ]
        });

        // Правая таблица - Объект
        const rightTableWidth = 7200;

        const rightTable = new Table({
            width: { size: rightTableWidth, type: WidthType.DXA },
            rows: [
                new TableRow({
                    children: [
                        createCell('Наименование объекта:', { width: 3200 }),
                        createCell(v(formValue.objectName, 'Наименование объекта'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Уровень качества:', { width: 3200 }),
                        createCell(v(formValue.qualityLevel, 'A или B или C'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Объем контроля:', { width: 3200 }),
                        createCell(`${num(formValue.controlVolume, '____')}%`, { width: 4000 })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Название трассы:', { width: 3200 }),
                        createCell(v(formValue.routeName, 'Название трассы'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Участок трубопровода, километраж:', { width: 3200 }),
                        createCell(v(formValue.pipelineSection, 'Участок трубопровода, километраж'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Наименование организации подрядчика:', { width: 3200 }),
                        createCell(v(formValue.contractor, 'Организация подрядчика'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Наименование организации заказчика:', { width: 3200 }),
                        createCell(v(formValue.customer, 'Организация заказчика'), { width: 4000, italic: true })
                    ]
                }),
                new TableRow({
                    children: [
                        createCell('Шифр бригады или клеймо сварщика:', { width: 3200 }),
                        createCell(v(formValue.welderCode, 'Шифр бригады или клеймо сварщика'), { width: 4000, italic: true })
                    ]
                })
            ]
        });

        // Контейнер для двух таблиц рядом
        const topTablesContainer = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
                            },
                            children: [leftTable]
                        }),
                        new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
                            },
                            children: [rightTable]
                        })
                    ]
                })
            ]
        });

        // ========== Заголовок ЗАКЛЮЧЕНИЕ ==========
        const conclusionTitle = new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 100 },
            children: [
                new TextRun({ text: 'ЗАКЛЮЧЕНИЕ № ', font: FONT, size: 28, bold: true }),
                new TextRun({
                    text: v(formValue.conclusionNumber, '___________'),
                    font: FONT,
                    size: 28,
                    bold: true,
                    underline: {}
                })
            ]
        });

        const conclusionDate = new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [new TextRun({ text: `от ${formatRuDate(formValue.conclusionDate)}`, font: FONT, size: 24 })]
        });

        const conclusionSubtitle = new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: 'по результатам контроля качества сварных соединений/основного металла ультразвуковым методом (РУЗК)',
                    font: FONT,
                    size: FONT_SIZE
                })
            ]
        });

        // ========== РЕЗУЛЬТАТЫ КОНТРОЛЯ ==========
        const resultsTitle = new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [new TextRun({ text: 'РЕЗУЛЬТАТЫ КОНТРОЛЯ', font: FONT, size: 24, bold: true })]
        });

        // Ширины колонок таблицы результатов (в DXA, 1440 DXA = 1 дюйм)
        const colWidths = [1100, 1100, 800, 1000, 1000, 900, 800, 900, 1000, 1100, 1000, 1000];

        // Заголовок таблицы результатов
        const resultsTableHeader = new TableRow({
            tableHeader: true,
            children: [
                createMultilineCell([{ text: 'Номер сварного соединения по журналу сварки' }], {
                    width: colWidths[0],
                    alignment: AlignmentType.CENTER
                }),
                createMultilineCell([{ text: 'Диаметр и толщина стенки трубы, мм' }], { width: colWidths[1], alignment: AlignmentType.CENTER }),
                createMultilineCell([{ text: 'Номер дефекта' }], { width: colWidths[2], alignment: AlignmentType.CENTER }),
                createMultilineCell([{ text: 'Эквиви-валентная площадь дефекта' }, { text: 'S' }, { text: 'деф' }, { text: ', мм²' }], {
                    width: colWidths[3],
                    alignment: AlignmentType.CENTER
                }),
                createMultilineCell([{ text: 'Поправки чувстви-тельности, дБ' }], { width: colWidths[4], alignment: AlignmentType.CENTER }),
                createMultilineCell([{ text: 'Протяжен-ность' }, { text: 'L, мм' }], { width: colWidths[5], alignment: AlignmentType.CENTER }),
                createMultilineCell([{ text: 'Высота дефекта' }, { text: 'h, мм' }], { width: colWidths[6], alignment: AlignmentType.CENTER }),
                createMultilineCell([{ text: 'Глубина залегания дефекта' }, { text: 'Y, мм' }], { width: colWidths[7], alignment: AlignmentType.CENTER }),
                createMultilineCell([{ text: 'Суммарная протяжен-ность дефекта' }, { text: '(ƩД), мм' }], {
                    width: colWidths[8],
                    alignment: AlignmentType.CENTER
                }),
                createMultilineCell([{ text: 'Координаты выявленных дефектов по периметру сварного шва, мм' }], {
                    width: colWidths[9],
                    alignment: AlignmentType.CENTER
                }),
                createMultilineCell([{ text: 'Заключение' }, { text: '(годен, ремонт, вырезать)' }], {
                    width: colWidths[10],
                    alignment: AlignmentType.CENTER
                }),
                createCell('Примечания', { width: colWidths[11], alignment: AlignmentType.CENTER })
            ]
        });

        // Строки данных таблицы результатов
        const resultsTableRows = formValue.defects.map(
            (defect) =>
                new TableRow({
                    children: [
                        createCell(v(defect.weldNumber, '___'), { width: colWidths[0], alignment: AlignmentType.CENTER }),
                        createCell(`${num(defect.diameter, '___')}×${num(defect.thickness, '___')}`, {
                            width: colWidths[1],
                            alignment: AlignmentType.CENTER
                        }),
                        createCell(num(defect.defectNumber, '___'), { width: colWidths[2], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.defectArea, '____'), { width: colWidths[3], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.sensitivityCorrection, '___'), { width: colWidths[4], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.length, '___'), { width: colWidths[5], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.height, '___'), { width: colWidths[6], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.depth, '___'), { width: colWidths[7], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.totalLength, '___'), { width: colWidths[8], alignment: AlignmentType.CENTER }),
                        createCell(num(defect.perimeterCoord, '_____'), { width: colWidths[9], alignment: AlignmentType.CENTER }),
                        createCell(defect.conclusion || '______', { width: colWidths[10], alignment: AlignmentType.CENTER }),
                        createCell(v(defect.notes, '____'), { width: colWidths[11], alignment: AlignmentType.CENTER })
                    ]
                })
        );

        const resultsTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [resultsTableHeader, ...resultsTableRows]
        });

        // ========== Итоговое заключение ==========
        const firstWeldNumber = formValue.defects.length > 0 ? formValue.defects[0].weldNumber : '____';
        const finalConclusionParagraph = new Paragraph({
            spacing: { before: 300, after: 300 },
            children: [
                new TextRun({ text: 'Заключение о качестве сварного соединения № ', font: FONT, size: FONT_SIZE }),
                new TextRun({ text: v(firstWeldNumber, '____'), font: FONT, size: FONT_SIZE, bold: true, underline: {} }),
                new TextRun({ text: ' — ', font: FONT, size: FONT_SIZE }),
                new TextRun({ text: formValue.finalConclusion || '__________', font: FONT, size: FONT_SIZE, bold: true, underline: {} }),
                new TextRun({ text: ' (годен, ремонт, вырезать)', font: FONT, size: FONT_SIZE })
            ]
        });

        // ========== Подписи ==========
        const signaturesTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
            },
            rows: [
                // Контроль провел
                new TableRow({
                    children: [
                        createCell('Контроль провел', { width: 2000, noBorders: true }),
                        createCell(v(formValue.inspector.fullName, 'ФИО'), { width: 2500, noBorders: true, italic: true, bold: true }),
                        createCell(`Уровень квалификации, удостоверение № ${v(formValue.inspector.qualification, '____________________')}`, {
                            width: 5500,
                            noBorders: true
                        }),
                        createCell('Подпись', { width: 1500, noBorders: true }),
                        createCell(formatShortDate(formValue.inspector.date), { width: 2000, noBorders: true, italic: true })
                    ]
                }),
                // Пустая строка
                new TableRow({
                    children: [
                        createCell('', { width: 2000, noBorders: true }),
                        createCell('', { width: 2500, noBorders: true }),
                        createCell('', { width: 5500, noBorders: true }),
                        createCell('', { width: 1500, noBorders: true }),
                        createCell('', { width: 2000, noBorders: true })
                    ]
                }),
                // Заключение выдал
                new TableRow({
                    children: [
                        createCell('Заключение выдал', { width: 2000, noBorders: true }),
                        createCell(v(formValue.approver.fullName, 'ФИО'), { width: 2500, noBorders: true, italic: true, bold: true }),
                        createCell(`Уровень квалификации, удостоверение № ${v(formValue.approver.qualification, '____________________')}`, {
                            width: 5500,
                            noBorders: true
                        }),
                        createCell('Подпись', { width: 1500, noBorders: true }),
                        createCell(formatShortDate(formValue.approver.date), { width: 2000, noBorders: true, italic: true })
                    ]
                })
            ]
        });

        // ========== Создание документа ==========
        const doc = new Document({
            sections: [
                {
                    properties: {
                        page: {
                            size: {
                                orientation: PageOrientation.LANDSCAPE
                            },
                            margin: {
                                top: convertMillimetersToTwip(10),
                                bottom: convertMillimetersToTwip(10),
                                left: convertMillimetersToTwip(15),
                                right: convertMillimetersToTwip(15)
                            }
                        }
                    },
                    headers: {
                        default: header
                    },
                    children: [
                        topTablesContainer,
                        conclusionTitle,
                        conclusionDate,
                        conclusionSubtitle,
                        resultsTitle,
                        resultsTable,
                        finalConclusionParagraph,
                        signaturesTable
                    ]
                }
            ]
        });

        return await Packer.toBlob(doc);
    }
}
