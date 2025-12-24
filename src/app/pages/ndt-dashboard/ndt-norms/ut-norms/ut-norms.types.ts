// Тип для описания условия допустимой длины
export interface LengthCondition {
    // Множитель для S (1 = S, 2 = 2S)
    sMultiplier: number;
    // Максимальное значение l в мм
    maxL: number;
    // Суммарное значение ∑300
    sum300: number;
    // Оператор сравнения: '<=' или '<'
    operator: '<=' | '<';
}

// Структура для одной строки таблицы 6.6
export interface DefectRow {
    name: string; // Наименование дефекта
    code: string; // Условное обозначение
    type: string; // Вид дефекта
    levelA: LengthCondition | null; // null = "Не допускаются"
    levelB: LengthCondition | null;
    levelC: LengthCondition | null;
}
