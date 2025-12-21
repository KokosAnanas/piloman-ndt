import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-pt-norms',
    imports: [Card, Button],
    templateUrl: './pt-norms.html',
    styleUrl: './pt-norms.scss'
})
export class PtNorms {
    @Output() close = new EventEmitter<void>();
}
