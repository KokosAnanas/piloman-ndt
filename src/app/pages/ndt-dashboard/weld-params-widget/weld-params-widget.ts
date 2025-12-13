import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { WeldParamsStore } from '@/store/weld-params.store';
import { NdtMethodButtonState, NdtMethodKey } from './weld-params-widget.types';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'app-weld-params-widget',
    imports: [Card, FormsModule, InputNumber, Select, NgOptimizedImage, Button, ButtonModule, ButtonGroup, NgClass, SelectButton],
    templateUrl: './weld-params-widget.html',
    styleUrl: './weld-params-widget.scss'
})
export class WeldParamsWidget {
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

    // обработчик нажатия на кнопки
    toggleMethod(key: NdtMethodKey, button: 'docs' | 'testRepor'): void {
        const method = this.ndtMethods.find((m) => m.key === key);
        if (!method) {
            return;
        }

        if (button === 'docs') {
            method.docsActive = !method.docsActive;

            // TODO: сюда потом добавишь включение/выключение виджета "Нормативы" для метода key
        } else {
            method.testReportActive = !method.testReportActive;

            // TODO: сюда потом добавишь включение/выключение виджета "Заключение" для метода key
        }
    }

    // Эти методы будем вызывать из шаблона - запись в store s1 и s2
    onS1Change(value: number | null) {
        this.weldParamsStore.setS1(value ?? null);
    }

    onS2Change(value: number | null) {
        this.weldParamsStore.setS2(value ?? null);
    }
}
