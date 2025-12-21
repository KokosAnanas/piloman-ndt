import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-pt-test-reports',
    imports: [Card, Button],
    templateUrl: './pt-test-reports.html',
    styleUrl: './pt-test-reports.scss'
})
export class PtTestReports {
    @Output() close = new EventEmitter<void>();
}
