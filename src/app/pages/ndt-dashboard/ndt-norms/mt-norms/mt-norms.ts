import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-mt-norms',
    imports: [Card, Button],
    templateUrl: './mt-norms.html',
    styleUrl: './mt-norms.scss'
})
export class MtNorms {
    @Output() close = new EventEmitter<void>();
}
