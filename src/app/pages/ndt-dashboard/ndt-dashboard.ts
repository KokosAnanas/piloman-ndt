import { Component } from '@angular/core';
import { TestObject } from '@/widgets/test-object/test-object';
import { VisualTestingWidget } from '@/widgets/visual-testing-widget/visual-testing-widget';
import { UltrasonicTestingWidget } from '@/widgets/ultrasonic-testing-widget/ultrasonic-testing-widget';
import { RadiographicTestingWidget } from '@/widgets/radiographic-testing-widget/radiographic-testing-widget';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ndt-dashboard',
    imports: [TestObject, VisualTestingWidget,
        UltrasonicTestingWidget, RadiographicTestingWidget, RouterLink],
    templateUrl: './ndt-dashboard.html',
    styleUrl: './ndt-dashboard.scss'
})
export class NdtDashboard {}
