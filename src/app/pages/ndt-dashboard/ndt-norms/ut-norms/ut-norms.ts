import { Component, Output, EventEmitter, inject, computed } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { QualityLevel, WeldParamsStore } from '@/store/weld-params.store';
import { DefectRow, LengthCondition } from '@/pages/ndt-dashboard/ndt-norms/ut-norms/ut-norms.types';

@Component({
    selector: 'app-ut-norms',
    imports: [Card, Button, TableModule],
    templateUrl: './ut-norms.html',
    styleUrl: './ut-norms.scss'
})
export class UtNorms {
    @Output() close = new EventEmitter<void>();

    private readonly weldParamsStore = inject(WeldParamsStore);

    // Сигналы из store
    readonly s = this.weldParamsStore.s;
    readonly qualityLevel = this.weldParamsStore.qualityLevel;

    // Данные таблицы 6.6 согласно СТО Газпром 15-1.3-004-2023
    readonly defectData: DefectRow[] = [
        {
            name: 'Непротяженный',
            code: 'SH',
            type: 'Объемный, плоскостной',
            levelA: { sMultiplier: 0, maxL: 0, sum300: 30, operator: '<=' },
            levelB: { sMultiplier: 0, maxL: 0, sum300: 50, operator: '<=' },
            levelC: { sMultiplier: 0, maxL: 0, sum300: 50, operator: '<=' }
        },
        {
            name: 'Протяженный в сечении шва',
            code: 'LS1',
            type: 'Объемно-протяженный',
            levelA: { sMultiplier: 1, maxL: 15, sum300: 30, operator: '<=' },
            levelB: { sMultiplier: 2, maxL: 25, sum300: 50, operator: '<' },
            levelC: { sMultiplier: 2, maxL: 25, sum300: 50, operator: '<' }
        },
        {
            name: 'Протяженный в сечении шва',
            code: 'LS2',
            type: 'Плоскостной по разделке кромок*',
            levelA: null,
            levelB: { sMultiplier: 2, maxL: 15, sum300: 15, operator: '<=' },
            levelC: { sMultiplier: 2, maxL: 15, sum300: 15, operator: '<=' }
        },
        {
            name: 'Протяженный в сечении шва',
            code: 'LS3',
            type: 'Плоскостной в металле сварного шва',
            levelA: { sMultiplier: 2, maxL: 25, sum300: 25, operator: '<=' },
            levelB: { sMultiplier: 2, maxL: 30, sum300: 30, operator: '<=' },
            levelC: { sMultiplier: 2, maxL: 30, sum300: 30, operator: '<=' }
        },
        {
            name: 'Протяженный в корне шва',
            code: 'LB1',
            type: 'Плоскостной в корне (двухсторонний непровар)',
            levelA: { sMultiplier: 1, maxL: 12.5, sum300: 25, operator: '<=' },
            levelB: { sMultiplier: 2, maxL: 15, sum300: 30, operator: '<=' },
            levelC: { sMultiplier: 2, maxL: 25, sum300: 50, operator: '<=' }
        },
        {
            name: 'Протяженный в корне шва',
            code: 'LB2',
            type: 'Плоскостной в корне шва из-за смещения кромок (непровар)',
            levelA: { sMultiplier: 2, maxL: 30, sum300: 50, operator: '<=' },
            levelB: { sMultiplier: 2, maxL: 50, sum300: 75, operator: '<=' },
            levelC: { sMultiplier: 2, maxL: 50, sum300: 75, operator: '<=' }
        },
        {
            name: 'Протяженный в корне шва',
            code: 'LB3',
            type: 'Утяжина, превышение проплава',
            levelA: { sMultiplier: 1, maxL: 30, sum300: 50, operator: '<=' },
            levelB: { sMultiplier: 2, maxL: 50, sum300: 100, operator: '<=' },
            levelC: { sMultiplier: 2, maxL: 50, sum300: 100, operator: '<=' }
        },
        {
            name: 'Протяженный в корне шва',
            code: 'LB4',
            type: 'Плоскостной по разделке кромок',
            levelA: null,
            levelB: { sMultiplier: 1, maxL: 15, sum300: 15, operator: '<=' },
            levelC: { sMultiplier: 1, maxL: 15, sum300: 15, operator: '<=' }
        },
        {
            name: 'Цепочка (скопление)',
            code: 'CC',
            type: 'Скопления и цепочки непротяженных дефектов',
            levelA: { sMultiplier: 1, maxL: 12.5, sum300: 25, operator: '<=' },
            levelB: { sMultiplier: 1, maxL: 15, sum300: 30, operator: '<=' },
            levelC: { sMultiplier: 1, maxL: 15, sum300: 30, operator: '<=' }
        }
    ];

    // Вычисляемые данные таблицы с учётом текущего уровня качества и S
    readonly tableData = computed(() => {
        const level = this.qualityLevel();
        const sValue = this.s();

        return this.defectData.map((row) => ({
            name: row.name,
            code: row.code,
            type: row.type,
            allowableLength: this.formatAllowableLength(this.getConditionByLevel(row, level), sValue)
        }));
    });

    // Заголовок столбца с уровнем качества
    readonly qualityLevelHeader = computed(() => {
        return `Для уровня качества «${this.qualityLevel()}»`;
    });

    private getConditionByLevel(row: DefectRow, level: QualityLevel): LengthCondition | null {
        switch (level) {
            case 'A':
                return row.levelA;
            case 'B':
                return row.levelB;
            case 'C':
                return row.levelC;
            default:
                return row.levelA;
        }
    }

    private formatAllowableLength(condition: LengthCondition | null, sValue: number | null): string {
        if (condition === null) {
            return 'Не допускаются';
        }

        // Для непротяженного дефекта (SH) - только ∑300
        if (condition.sMultiplier === 0 && condition.maxL === 0) {
            return `∑300 ≤ ${condition.sum300} мм`;
        }

        // Если S не задано, показываем формулу
        if (sValue === null) {
            const sExpr = condition.sMultiplier === 1 ? 'S' : `${condition.sMultiplier}S`;
            const op = condition.operator === '<=' ? '≤' : '<';
            return `l ${op} ${sExpr} и l ${op} ${condition.maxL} мм;\n∑300 ≤ ${condition.sum300} мм`;
        }

        // Вычисляем фактическое значение с учётом S
        const sCalculated = condition.sMultiplier * sValue;
        // Из двух значений выбираем наименьшее (примечание к таблице)
        const effectiveL = Math.min(sCalculated, condition.maxL);
        const op = condition.operator === '<=' ? '≤' : '<';

        return `l ${op} ${effectiveL} мм;\n∑300 ≤ ${condition.sum300} мм`;
    }
}
