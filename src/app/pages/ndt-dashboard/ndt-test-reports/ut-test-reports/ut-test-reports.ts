import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-ut-test-reports',
    imports: [Card, Button],
    templateUrl: './ut-test-reports.html',
    styleUrl: './ut-test-reports.scss'
})
export class UtTestReports {
    @Output() close = new EventEmitter<void>();
}
