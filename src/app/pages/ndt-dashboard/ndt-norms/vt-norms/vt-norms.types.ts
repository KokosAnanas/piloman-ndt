export enum DynamicKind {
    Fc = 'fc',
    Fd = 'fd'
}

interface NormRowBase {
    defectName: string;
    symbol: string;
}

interface StaticNormRow extends NormRowBase {
    description: string;
    dynamicKind?: undefined;
}

interface DynamicNormRow extends NormRowBase {
    dynamicKind: DynamicKind;
    description?: string;
}

export type NormRow = StaticNormRow | DynamicNormRow;
