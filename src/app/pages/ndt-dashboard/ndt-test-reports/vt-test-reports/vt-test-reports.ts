import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-vt-test-reports',
    imports: [Card, Button],
    templateUrl: './vt-test-reports.html',
    styleUrl: './vt-test-reports.scss'
})
export class VtTestReports {
    @Output() close = new EventEmitter<void>();
}
