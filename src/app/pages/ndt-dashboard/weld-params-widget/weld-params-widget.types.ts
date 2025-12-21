export type NdtMethodKey = 'vt' | 'ut' | 'rt' | 'pt' | 'mt' | 'utEdges';

export type WidgetType = 'norms' | 'testReport';

// Состояние активного виджета: либо ничего не открыто, либо открыт один конкретный виджет
export type ActiveWidgetState =
    | { type: 'none' }
    | { type: 'norms'; method: NdtMethodKey }
    | { type: 'testReport'; method: NdtMethodKey };

export interface NdtMethodButtonState {
    key: NdtMethodKey;
    label: string;
    docsActive: boolean; // кнопка с книжкой (norms)
    testReportActive: boolean; // кнопка с подписью (testReport)
}
