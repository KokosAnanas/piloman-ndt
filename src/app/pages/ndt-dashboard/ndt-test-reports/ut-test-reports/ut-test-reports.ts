import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { SelectButton } from 'primeng/selectbutton';
import { WeldParamsStore } from '@/store/weld-params.store';
import { UtConclusionForm, DefectRowForm, ConclusionStatus } from './ut-test-reports.types';
import { FloatLabel } from 'primeng/floatlabel';
import { UtTestReportsDocxService, UtConclusionFormValue } from './ut-test-reports-docx.service';

@Component({
    selector: 'app-ut-test-reports',
    imports: [CommonModule, ReactiveFormsModule, Card, Button, InputText, InputNumber, DatePicker, Select, TableModule, SelectButton, FloatLabel],
    templateUrl: './ut-test-reports.html',
    styleUrl: './ut-test-reports.scss'
})
export class UtTestReports implements OnInit {
    @Output() close = new EventEmitter<void>();

    private readonly fb = inject(FormBuilder);
    private readonly weldParamsStore = inject(WeldParamsStore);
    private readonly docxService = inject(UtTestReportsDocxService);

    form!: FormGroup<UtConclusionForm>;

    // Опции для выпадающих списков
    readonly qualityLevelOptions = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' }
    ];

    readonly conclusionOptions: { label: string; value: ConclusionStatus }[] = [
        { label: 'Годен', value: 'годен' },
        { label: 'Ремонт', value: 'ремонт' },
        { label: 'Вырезать', value: 'вырезать' }
    ];

    // Показать JSON для отладки
    showJsonPreview = false;

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        const today = new Date();
        const qualityLevel = this.weldParamsStore.qualityLevel();

        this.form = this.fb.group<UtConclusionForm>({
            // Левый верхний блок - Лаборатория
            labName: this.fb.nonNullable.control('', Validators.required),
            attestationNumber: this.fb.nonNullable.control(''),
            normativeDocument: this.fb.nonNullable.control('СТО Газпром 15-1.3-004-2023; СТО Газпром 15-2.3-005-2023'),
            otkNumber: this.fb.nonNullable.control(''),
            defectoscope: this.fb.nonNullable.control(''),
            transducers: this.fb.nonNullable.control(''),
            calibrationBlock: this.fb.nonNullable.control(''),
            vikConclusionNumber: this.fb.nonNullable.control(''),
            vikConclusionDate: this.fb.control<Date | null>(null),

            // Правый верхний блок - Объект
            objectName: this.fb.nonNullable.control('', Validators.required),
            qualityLevel: this.fb.nonNullable.control<'A' | 'B' | 'C'>(qualityLevel, Validators.required),
            controlVolume: this.fb.control<number | null>(100),
            routeName: this.fb.nonNullable.control(''),
            pipelineSection: this.fb.nonNullable.control(''),
            contractor: this.fb.nonNullable.control(''),
            customer: this.fb.nonNullable.control(''),
            welderCode: this.fb.nonNullable.control(''),

            // Заголовок заключения
            conclusionNumber: this.fb.nonNullable.control('', Validators.required),
            conclusionDate: this.fb.control<Date | null>(today, Validators.required),

            // Таблица результатов контроля
            defects: this.fb.array<FormGroup<DefectRowForm>>([]),

            // Итоговое заключение
            finalConclusion: this.fb.nonNullable.control<ConclusionStatus>('годен'),

            // Подписи
            inspector: this.fb.group({
                fullName: this.fb.nonNullable.control(''),
                qualification: this.fb.nonNullable.control(''),
                date: this.fb.control<Date | null>(today)
            }),
            approver: this.fb.group({
                fullName: this.fb.nonNullable.control(''),
                qualification: this.fb.nonNullable.control(''),
                date: this.fb.control<Date | null>(today)
            })
        });

        // Добавляем первую строку дефектов
        this.addDefectRow();
    }

    get defects(): FormArray<FormGroup<DefectRowForm>> {
        return this.form.controls.defects;
    }

    // Получить номер сварного соединения из первой строки таблицы
    get firstWeldNumber(): string {
        if (this.defects.length > 0) {
            return this.defects.at(0).controls.weldNumber.value || '____';
        }
        return '____';
    }

    addDefectRow() {
        const defectRow = this.fb.group<DefectRowForm>({
            weldNumber: this.fb.nonNullable.control(''),
            diameter: this.fb.control<number | null>(null),
            thickness: this.fb.control<number | null>(null),
            defectNumber: this.fb.control<number | null>(null),
            defectArea: this.fb.control<number | null>(null),
            sensitivityCorrection: this.fb.control<number | null>(null),
            length: this.fb.control<number | null>(null),
            height: this.fb.control<number | null>(null),
            depth: this.fb.control<number | null>(null),
            totalLength: this.fb.control<number | null>(null),
            perimeterCoord: this.fb.control<number | null>(null),
            conclusion: this.fb.nonNullable.control<ConclusionStatus>('годен'),
            notes: this.fb.nonNullable.control('')
        });

        this.defects.push(defectRow);
    }

    removeDefectRow() {
        if (this.defects.length > 1) {
            this.defects.removeAt(this.defects.length - 1);
        }
    }

    async onDownloadDocx() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        try {
            const formValue = this.form.value as UtConclusionFormValue;
            const blob = await this.docxService.buildDocx(formValue);

            // Динамический импорт file-saver
            const { saveAs } = await import('file-saver');
            saveAs(blob, 'Уведомление.docx');
        } catch (error) {
            console.error('Ошибка генерации DOCX:', error);
            alert('Ошибка при создании документа. См. консоль.');
        }
    }

    onPrint() {
        // Заглушка для печати
        window.print();
    }

    onSave() {
        if (this.form.valid) {
            console.log('Сохранение формы:', this.form.value);
            alert('Данные сохранены (см. консоль)');
        } else {
            this.form.markAllAsTouched();
            alert('Заполните обязательные поля');
        }
    }

    toggleJsonPreview() {
        this.showJsonPreview = !this.showJsonPreview;
    }

    // Проверка на ошибку поля
    hasError(controlName: string): boolean {
        const control = this.form.get(controlName);
        return control ? control.invalid && control.touched : false;
    }
}
