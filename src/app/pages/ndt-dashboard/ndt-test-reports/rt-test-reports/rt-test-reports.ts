import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-rt-test-reports',
    imports: [Card, Button],
    templateUrl: './rt-test-reports.html',
    styleUrl: './rt-test-reports.scss'
})
export class RtTestReports {
    @Output() close = new EventEmitter<void>();
}
