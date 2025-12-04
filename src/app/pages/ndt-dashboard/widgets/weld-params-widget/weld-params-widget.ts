import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-weld-params-widget',
    imports: [Card, FormsModule, InputNumber, Select, NgOptimizedImage],
    templateUrl: './weld-params-widget.html',
    styleUrl: './weld-params-widget.scss'
})
export class WeldParamsWidget {
    qualityLevels = ['A', 'B', 'C'];
    weldingProcess = ['Ручная дуговая, полуавтоматическая', 'Автоматическая в защитных газах', 'Автоматическая под флюсом'];
    joint = ['Стыковое', 'Угловое и нахлёсточное'];
}
