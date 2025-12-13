export type NdtMethodKey = 'vt' | 'ut' | 'rt' | 'pt' | 'mt' | 'utEdges';

export interface NdtMethodButtonState {
    key: NdtMethodKey;
    label: string;
    docsActive: boolean; // кнопка с книжкой
    testReportActive: boolean; // кнопка с подписью
}
