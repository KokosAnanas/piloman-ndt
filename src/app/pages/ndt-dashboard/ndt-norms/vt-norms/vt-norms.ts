import { Component, computed, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { WeldParamsStore } from '@/store/weld-params.store';
import { DynamicKind, NormRow } from './vt-norms.types';
import { describeFc, describeFd, formatMm } from './vt-norms.utils';

@Component({
    selector: 'app-vt-norms',
    imports: [TableModule, Card],
    templateUrl: './vt-norms.html',
    styleUrl: './vt-norms.scss'
})
export class VtNorms {
    private readonly weldParamsStore = inject(WeldParamsStore);

    readonly thicknessS = this.weldParamsStore.s;

    readonly formattedThicknessS = computed(() => {
        const s = this.thicknessS();
        return s == null ? null : formatMm(s);
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
            dynamicKind: DynamicKind.Fc
        },
        {
            defectName: 'Смещение кромок*',
            symbol: 'Fd',
            dynamicKind: DynamicKind.Fd
        }
    ];

    // ====== computed-тексты для Fc/Fd ======
    readonly fcDescriptionText = computed(() => describeFc(this.thicknessS()));

    readonly fdDescriptionText = computed(() => describeFd(this.thicknessS()));

    protected readonly DynamicKind = DynamicKind;
}
