import { Component } from '@angular/core';
import { WeldParamsWidget } from '@/pages/ndt-dashboard/weld-params-widget/weld-params-widget';
import { Fluid } from 'primeng/fluid';
import { UtNorms } from '@/pages/ndt-dashboard/ndt-norms/ut-norms/ut-norms';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [WeldParamsWidget, Fluid, UtNorms],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {}
