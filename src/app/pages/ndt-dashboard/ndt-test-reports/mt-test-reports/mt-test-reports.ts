import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-mt-test-reports',
    imports: [Card, Button],
    templateUrl: './mt-test-reports.html',
    styleUrl: './mt-test-reports.scss'
})
export class MtTestReports {
    @Output() close = new EventEmitter<void>();
}
