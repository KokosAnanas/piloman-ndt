import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-ut-edges-test-report',
    imports: [Card, Button],
    templateUrl: './ut-edges-test-report.html',
    styleUrl: './ut-edges-test-report.scss'
})
export class UtEdgesTestReport {
    @Output() close = new EventEmitter<void>();
}
