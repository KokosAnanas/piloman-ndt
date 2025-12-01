import { Component } from '@angular/core';
import { WeldParamsWidget } from '@/pages/ndt-dashboard/widgets/weld-params-widget/weld-params-widget';
import { VisualTestingWidget } from '@/pages/ndt-dashboard/widgets/visual-testing-widget/visual-testing-widget';
import { UltrasonicTestingWidget } from '@/pages/ndt-dashboard/widgets/ultrasonic-testing-widget/ultrasonic-testing-widget';
import { RadiographicTestingWidget } from '@/pages/ndt-dashboard/widgets/radiographic-testing-widget/radiographic-testing-widget';
import {
    PenetrantTestingWidget
} from '@/pages/ndt-dashboard/widgets/penetrant-testing-widget/penetrant-testing-widget';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [WeldParamsWidget, VisualTestingWidget,
        UltrasonicTestingWidget, RadiographicTestingWidget,
        PenetrantTestingWidget],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {}
