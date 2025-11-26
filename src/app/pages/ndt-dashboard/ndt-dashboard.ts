import { Component } from '@angular/core';
import { TestObjectWidget } from '@/pages/ndt-dashboard/widgets/test-object-widget/test-object-widget';
import { VisualTestingWidget } from '@/pages/ndt-dashboard/widgets/visual-testing-widget/visual-testing-widget';
import { UltrasonicTestingWidget } from '@/pages/ndt-dashboard/widgets/ultrasonic-testing-widget/ultrasonic-testing-widget';
import { RadiographicTestingWidget } from '@/pages/ndt-dashboard/widgets/radiographic-testing-widget/radiographic-testing-widget';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [TestObjectWidget, VisualTestingWidget,
        UltrasonicTestingWidget, RadiographicTestingWidget, RouterLink],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {}
