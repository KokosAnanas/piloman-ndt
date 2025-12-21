import { Component, computed, signal } from '@angular/core';
import { WeldParamsWidget } from '@/pages/ndt-dashboard/weld-params-widget/weld-params-widget';
import { Fluid } from 'primeng/fluid';
// Norms components
import { VtNorms } from '@/pages/ndt-dashboard/ndt-norms/vt-norms/vt-norms';
import { UtNorms } from '@/pages/ndt-dashboard/ndt-norms/ut-norms/ut-norms';
import { RtNorms } from '@/pages/ndt-dashboard/ndt-norms/rt-norms/rt-norms';
import { PtNorms } from '@/pages/ndt-dashboard/ndt-norms/pt-norms/pt-norms';
import { MtNorms } from '@/pages/ndt-dashboard/ndt-norms/mt-norms/mt-norms';
import { UtEdgesNorms } from '@/pages/ndt-dashboard/ndt-norms/ut-edges-norms/ut-edges-norms';
// Test reports components
import { VtTestReports } from '@/pages/ndt-dashboard/ndt-test-reports/vt-test-reports/vt-test-reports';
import { UtTestReports } from '@/pages/ndt-dashboard/ndt-test-reports/ut-test-reports/ut-test-reports';
import { RtTestReports } from '@/pages/ndt-dashboard/ndt-test-reports/rt-test-reports/rt-test-reports';
import { PtTestReports } from '@/pages/ndt-dashboard/ndt-test-reports/pt-test-reports/pt-test-reports';
import { MtTestReports } from '@/pages/ndt-dashboard/ndt-test-reports/mt-test-reports/mt-test-reports';
import { UtEdgesTestReport } from '@/pages/ndt-dashboard/ndt-test-reports/ut-edges-test-report/ut-edges-test-report';
// Types
import { ActiveWidgetState, NdtMethodKey, WidgetType } from '@/pages/ndt-dashboard/weld-params-widget/weld-params-widget.types';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [
        WeldParamsWidget,
        Fluid,
        // Norms
        VtNorms,
        UtNorms,
        RtNorms,
        PtNorms,
        MtNorms,
        UtEdgesNorms,
        // Test reports
        VtTestReports,
        UtTestReports,
        RtTestReports,
        PtTestReports,
        MtTestReports,
        UtEdgesTestReport
    ],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {
    // Единый сигнал состояния: что сейчас открыто
    activeWidget = signal<ActiveWidgetState>({ type: 'none' });

    // Computed сигналы для использования в шаблоне
    activeWidgetType = computed(() => this.activeWidget().type);
    activeWidgetMethod = computed(() => {
        const widget = this.activeWidget();
        return widget.type !== 'none' ? widget.method : null;
    });

    closeWidget() {
        this.activeWidget.set({ type: 'none' });
    }

    onWidgetToggle(event: { method: NdtMethodKey; widgetType: WidgetType }) {
        const current = this.activeWidget();
        // Если кликнули на уже открытый виджет — закрыть
        if (current.type !== 'none' && current.type === event.widgetType && current.method === event.method) {
            this.activeWidget.set({ type: 'none' });
        } else {
            // Иначе — открыть новый (старый закроется автоматически)
            this.activeWidget.set({
                type: event.widgetType,
                method: event.method
            });
        }
    }
}
