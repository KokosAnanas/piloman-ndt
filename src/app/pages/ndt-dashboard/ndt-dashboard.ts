import { Component, signal } from '@angular/core';
import { WeldParamsWidget } from '@/pages/ndt-dashboard/weld-params-widget/weld-params-widget';
import { Fluid } from 'primeng/fluid';
import { VtNorms } from '@/pages/ndt-dashboard/ndt-norms/vt-norms/vt-norms';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [WeldParamsWidget, Fluid, VtNorms],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {
    showVtNorms = signal(false);

    setVtNormsOpen(value: boolean) {
        this.showVtNorms.set(value);
    }

    closeVtNorms() {
        this.showVtNorms.set(false);
    }
}
