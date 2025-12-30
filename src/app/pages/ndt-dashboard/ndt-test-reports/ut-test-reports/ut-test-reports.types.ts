import { FormControl, FormArray, FormGroup } from '@angular/forms';

// Тип итогового заключения
export type ConclusionStatus = 'годен' | 'ремонт' | 'вырезать';

// Интерфейс строки таблицы дефектов
export interface DefectRowForm {
    weldNumber: FormControl<string>;        // Номер сварного соединения по журналу сварки
    diameter: FormControl<number | null>;   // Диаметр трубы, мм
    thickness: FormControl<number | null>;  // Толщина стенки, мм
    defectNumber: FormControl<number | null>; // Номер дефекта
    defectArea: FormControl<number | null>;   // Эквивалентная площадь дефекта Sдеф, мм²
    sensitivityCorrection: FormControl<number | null>; // Поправки чувствительности, дБ
    length: FormControl<number | null>;       // Протяженность L, мм
    height: FormControl<number | null>;       // Высота дефекта h, мм
    depth: FormControl<number | null>;        // Глубина залегания дефекта Y, мм
    totalLength: FormControl<number | null>;  // Суммарная протяженность дефекта (ΣД), мм
    perimeterCoord: FormControl<number | null>; // Координаты по периметру шва, мм
    conclusion: FormControl<ConclusionStatus>; // Заключение (годен/ремонт/вырезать)
    notes: FormControl<string>;              // Примечания
}

// Интерфейс подписи
export interface SignatureForm {
    fullName: FormControl<string>;           // ФИО
    qualification: FormControl<string>;      // Уровень квалификации, удостоверение №
    date: FormControl<Date | null>;          // Дата
}

// Главная форма заключения УЗК
export interface UtConclusionForm {
    // Левый верхний блок - Лаборатория
    labName: FormControl<string>;            // Наименование лаборатории НК
    attestationNumber: FormControl<string>;  // Свидетельство об аттестации №
    normativeDocument: FormControl<string>;  // Нормативный документ
    otkNumber: FormControl<string>;          // Номер ОТК НК
    defectoscope: FormControl<string>;       // Дефектоскоп (тип/марка, заводской/серийный номер)
    transducers: FormControl<string>;        // Типы, номер преобразователей/акустических блоков
    calibrationBlock: FormControl<string>;   // Номер НО (калибровочного блока)
    vikConclusionNumber: FormControl<string>; // Заключение по ВИК №
    vikConclusionDate: FormControl<Date | null>; // Дата заключения по ВИК

    // Правый верхний блок - Объект
    objectName: FormControl<string>;         // Наименование объекта
    qualityLevel: FormControl<'A' | 'B' | 'C'>; // Уровень качества
    controlVolume: FormControl<number | null>; // Объём контроля, %
    routeName: FormControl<string>;          // Название трассы
    pipelineSection: FormControl<string>;    // Участок трубопровода, километраж
    contractor: FormControl<string>;         // Организация подрядчика
    customer: FormControl<string>;           // Организация заказчика
    welderCode: FormControl<string>;         // Шифр бригады или клеймо сварщика

    // Заголовок заключения
    conclusionNumber: FormControl<string>;   // Номер заключения
    conclusionDate: FormControl<Date | null>; // Дата заключения

    // Таблица результатов контроля
    defects: FormArray<FormGroup<DefectRowForm>>;

    // Итоговое заключение
    finalConclusion: FormControl<ConclusionStatus>;

    // Подписи
    inspector: FormGroup<SignatureForm>;     // Контроль провел
    approver: FormGroup<SignatureForm>;      // Заключение выдал
}
