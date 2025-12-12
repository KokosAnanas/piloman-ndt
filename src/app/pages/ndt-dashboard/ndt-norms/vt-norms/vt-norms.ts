import { Component, computed, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { WeldParamsStore } from '@/store/weld-params.store';

interface NormRow {
    defectName: string;
    symbol: string;
    description: string;
    dynamicKind?: 'fc' | 'fd';
}

const FC_BASE_TEXT = 'h ≤ 0,1·S, но не более 0,5 мм; l ≤ 150 мм.';

const FD_BASE_TEXT = 'Для труб: 2 ≤ S ≤ 5 мм — не более 0,4·S; ' + '5 < S ≤ 10 мм — не более 2,0 мм; ' + '10 < S ≤ 15 мм — не более 0,2·S; ' + 'S > 15 мм — не более 3,0 мм.';

@Component({
    selector: 'app-vt-norms',
    imports: [TableModule, Card],
    templateUrl: './vt-norms.html',
    styleUrl: './vt-norms.scss'
})
export class VtNorms {
    private readonly weldParamsStore = inject(WeldParamsStore);

    // сигнал толщины S из общего стора
    readonly thicknessS = this.weldParamsStore.s;

    private readonly numberFormatter = new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Статические данные из СТО
    readonly rows: NormRow[] = [
        {
            defectName: 'Поверхностные (подповерхностные) поры, металлические и неметаллические включения',
            symbol: 'A, B',
            description: 'Не допускаются'
        },
        {
            defectName: 'Свищи, плены, рванины, расслоения и закаты, прижоги, риски и задиры, выводящие ' + 'толщину стенки за пределы допустимых размеров',
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
            description: 'h ≤ 0,1·S, но не более 0,5 мм; l ≤ 150 мм.',
            dynamicKind: 'fc'
        },
        {
            defectName: 'Смещение кромок*',
            symbol: 'Fd',
            description: 'Для труб: 2 ≤ S ≤ 5 мм — не более 0,4·S; ' + '5 < S ≤ 10 мм — не более 2,0 мм; ' + '10 < S ≤ 15 мм — не более 0,2·S; ' + 'S > 15 мм — не более 3,0 мм.',
            dynamicKind: 'fd'
        }
    ];

    // ======================== Чистые функции норм ==================================

    // Подрезы (Fc): h ≤ 0,1S, но не более 0,5 мм
    fcLimit(s: number | null): number | null {
        if (s == null) {
            return null;
        }
        const raw = 0.1 * s;
        return raw > 0.5 ? 0.5 : raw;
    }

    // Смещение кромок (Fd): кусочная функция по S
    private fdLimit(s: number | null): number | null {
        if (s == null) {
            return null;
        }

        if (s < 2) {
            // формально таблица нормируется с 2 мм,
            // можно вернуть null, чтобы показать базовый текст
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

    private buildFcDescription(s: number | null): string {
        const limit = this.fcLimit(s);
        if (limit == null) {
            return FC_BASE_TEXT;
        }

        return `h ≤ ${this.numberFormatter.format(limit)} мм; l ≤ 150 мм.`;
    }

    private buildFdDescription(s: number | null): string {
        const limit = this.fdLimit(s);
        if (limit == null) {
            return FD_BASE_TEXT;
        }

        return `Смещение кромок не более ${this.numberFormatter.format(limit)} мм.`;
    }

    // ====== computed-тексты для Fc/Fd ======

    readonly fcDescriptionText = computed(() => this.buildFcDescription(this.thicknessS()));

    readonly fdDescriptionText = computed(() => this.buildFdDescription(this.thicknessS()));
}
