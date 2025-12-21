import { Component, signal } from '@angular/core';
import { WeldParamsWidget } from '@/pages/ndt-dashboard/weld-params-widget/weld-params-widget';
import { Fluid } from 'primeng/fluid';
import { VtNorms } from '@/pages/ndt-dashboard/ndt-norms/vt-norms/vt-norms';
import { UtNorms } from '@/pages/ndt-dashboard/ndt-norms/ut-norms/ut-norms';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [WeldParamsWidget, Fluid, VtNorms, UtNorms],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {
    activeNorms = signal<'none' | 'vt' | 'ut'>('none');

    closeNorms() {
        this.activeNorms.set('none');
    }

    onDocsToggle(kind: 'vt' | 'ut') {
        this.activeNorms.update(v => (v === kind ? 'none' : kind));
    }
}
