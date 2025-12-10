import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { DecimalPipe, NgIf, NgSwitch } from '@angular/common';
import { WeldParamsStore } from '@/store/weld-params.store';

interface NormRow {
    defectName: string;
    symbol: string;
    description: string;
}

@Component({
    selector: 'app-ut-norms',
    imports: [TableModule, Card, NgIf],
    templateUrl: './ut-norms.html',
    styleUrl: './ut-norms.scss'
})
export class UtNorms {
    readonly weldParamsStore = inject(WeldParamsStore);

    // Статические данные из СТО
    rows: NormRow[] = [
        {
            defectName: 'Поверхностные (подповерхностные) поры, металлические и неметаллические включения',
            symbol: 'A, B',
            description: 'Не допускаются'
        },
        {
            defectName: 'Свищи, плены, рванины, расслоения и закаты, прижоги, риски и задиры, ' + 'выводящие толщину стенки за пределы допустимых размеров',
            symbol: '-',
            description: 'Не допускаются'
        },
        {
            defectName: 'Кратеры',
            symbol: 'K',
            description: 'Не допускаются'
        },
        {
            defectName: 'Трещины',
            symbol: 'E',
            description: 'Не допускаются'
        },
        {
            defectName: 'Поверхностные (подповерхностные) несплавления по кромкам',
            symbol: 'Dc',
            description: 'Не допускаются'
        },
        {
            defectName: 'Подрезы',
            symbol: 'Fc',
            // Формула, зависящая от S
            description: 'h ≤ 0,1·S, но не более 0,5 мм; длина подреза l ≤ 150 мм.'
        },
        {
            defectName: 'Смещение кромок*',
            symbol: 'Fd',
            description: 'Для труб: 2 ≤ S ≤ 5 мм — не более 0,4·S; ' + '5 < S ≤ 10 мм — не более 2,0 мм; ' + '10 < S ≤ 15 мм — не более 0,2·S; ' + 'S > 15 мм — не более 3,0 мм.'
        }
    ];

    // Подрезы (Fc): h ≤ 0,1S, но не более 0,5 мм
    fcLimit(s: number | null): number | null {
        if (s == null) {
            return null;
        }
        const raw = 0.1 * s;
        return raw > 0.5 ? 0.5 : raw;
    }

    // Смещение кромок (Fd): кусочная функция по S
    fdLimit(s: number | null): number | null {
        if (s == null) {
            return null;
        }

        // 2 ≤ S ≤ 5 мм: не более 0,4S
        if (s <= 5) {
            return 0.4 * s;
        }

        // 5 < S ≤ 10 мм: не более 2,0 мм
        if (s <= 10) {
            return 2.0;
        }

        // 10 < S ≤ 15 мм: не более 0,2S
        if (s <= 15) {
            return 0.2 * s;
        }

        // S > 15 мм: не более 3,0 мм
        return 3.0;
    }
}
