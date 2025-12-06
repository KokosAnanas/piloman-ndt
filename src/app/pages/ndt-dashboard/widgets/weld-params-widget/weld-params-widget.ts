import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';

type NdtMethodKey = 'vik' | 'ut' | 'rk' | 'pvk' | 'mk' | 'utEdges';

interface NdtMethodButtonState {
    key: NdtMethodKey;
    label: string;
    bookActive: boolean; // кнопка с книжкой
    signActive: boolean; // кнопка с подписью
}

@Component({
    selector: 'app-weld-params-widget',
    imports: [Card, FormsModule, InputNumber, Select, NgOptimizedImage, Button, ButtonModule, ButtonGroup, NgClass, NgForOf, NgIf],
    templateUrl: './weld-params-widget.html',
    styleUrl: './weld-params-widget.scss'
})
export class WeldParamsWidget {
    qualityLevels = ['A', 'B', 'C'];
    weldingProcess = ['Ручная дуговая, полуавтоматическая', 'Автоматическая в защитных газах', 'Автоматическая под флюсом'];
    joint = ['Стыковое', 'Угловое и нахлёсточное'];

    // состояния всех шести групп
    ndtMethods: NdtMethodButtonState[] = [
        { key: 'vik', label: 'ВИК', bookActive: false, signActive: false },
        { key: 'ut', label: 'УЗК', bookActive: false, signActive: false },
        { key: 'rk', label: 'РК', bookActive: false, signActive: false },
        { key: 'pvk', label: 'ПВК', bookActive: false, signActive: false },
        { key: 'mk', label: 'МК', bookActive: false, signActive: false },
        { key: 'utEdges', label: 'УЗК кромок', bookActive: false, signActive: false }
    ];

    // обработчик нажатия на кнопки
    toggleMethod(key: NdtMethodKey, button: 'book' | 'sign'): void {
        const method = this.ndtMethods.find((m) => m.key === key);
        if (!method) {
            return;
        }

        if (button === 'book') {
            method.bookActive = !method.bookActive;

            // TODO: сюда потом добавишь включение/выключение виджета "Нормативы" для метода key
        } else {
            method.signActive = !method.signActive;

            // TODO: сюда потом добавишь включение/выключение виджета "Заключение" для метода key
        }
    }
}
