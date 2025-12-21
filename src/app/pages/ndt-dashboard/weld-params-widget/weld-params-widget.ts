import { Component, inject, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { WeldParamsStore } from '@/store/weld-params.store';
import { ActiveWidgetState, NdtMethodButtonState, NdtMethodKey, WidgetType } from './weld-params-widget.types';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'app-weld-params-widget',
    imports: [Card, FormsModule, InputNumber, Select, NgOptimizedImage, Button, ButtonModule, ButtonGroup, NgClass, SelectButton],
    templateUrl: './weld-params-widget.html',
    styleUrl: './weld-params-widget.scss'
})
export class WeldParamsWidget implements OnChanges {
    @Input() activeWidget: ActiveWidgetState = { type: 'none' };
    @Output() widgetToggle = new EventEmitter<{ method: NdtMethodKey; widgetType: WidgetType }>();
    readonly weldParamsStore = inject(WeldParamsStore);
    qualityLevels = [
        { label: ' A ', value: 'A' },
        { label: ' B ', value: 'B' },
        { label: ' C ', value: 'C' }
    ];
    valueQL: string = 'A';
    weldingProcess = ['Ручная дуговая, полуавтоматическая',
        'Автоматическая в защитных газах',
        'Автоматическая под флюсом'];
    joint = ['Стыковое', 'Угловое, нахлёсточное'];
    selectedJoint = this.joint[0];

    // состояния всех шести групп
    ndtMethods: NdtMethodButtonState[] = [
        { key: 'vt', label: 'ВИК', docsActive: false, testReportActive: false },
        { key: 'ut', label: 'УЗК', docsActive: false, testReportActive: false },
        { key: 'rt', label: 'РК', docsActive: false, testReportActive: false },
        { key: 'pt', label: 'ПВК', docsActive: false, testReportActive: false },
        { key: 'mt', label: 'МК', docsActive: false, testReportActive: false },
        { key: 'utEdges', label: 'УЗК кромок', docsActive: false, testReportActive: false }
    ];

    //--------------------------------------------------------------------------------------

    ngOnChanges(changes: SimpleChanges) {
        if (changes['activeWidget']) {
            // Синхронизировать состояние всех кнопок с activeWidget
            this.ndtMethods.forEach(method => {
                if (this.activeWidget.type === 'none') {
                    method.docsActive = false;
                    method.testReportActive = false;
                } else if (this.activeWidget.type === 'norms') {
                    method.docsActive = this.activeWidget.method === method.key;
                    method.testReportActive = false;
                } else if (this.activeWidget.type === 'testReport') {
                    method.docsActive = false;
                    method.testReportActive = this.activeWidget.method === method.key;
                }
            });
        }
    }

    // обработчик нажатия на кнопки
    toggleMethod(key: NdtMethodKey, button: 'docs' | 'testReport'): void {
        const widgetType: WidgetType = button === 'docs' ? 'norms' : 'testReport';
        this.widgetToggle.emit({ method: key, widgetType });
    }

    // Эти методы будем вызывать из шаблона - запись в store s1 и s2
    onS1Change(value: number | null) {
        this.weldParamsStore.setS1(value ?? null);
    }

    onS2Change(value: number | null) {
        this.weldParamsStore.setS2(value ?? null);
    }
}
