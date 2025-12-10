import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeldParamsStore {
    // Внутренние сигналы для S1 и S2
    private readonly _s1 = signal<number | null>(null);
    private readonly _s2 = signal<number | null>(null);

    // Публичные геттеры (чтобы снаружи не перетирать напрямую)
    readonly s1 = computed(() => this._s1());
    readonly s2 = computed(() => this._s2());

    // Общая толщина S = min(S1, S2)
    readonly s = computed<number | null>(() => {
        const s1 = this._s1();
        const s2 = this._s2();

        if (s1 == null && s2 == null) return null;
        if (s1 == null) return s2;
        if (s2 == null) return s1;
        return Math.min(s1, s2);
    });

    setS1(value: number | null) {
        this._s1.set(value);
    }

    setS2(value: number | null) {
        this._s2.set(value);
    }
}
