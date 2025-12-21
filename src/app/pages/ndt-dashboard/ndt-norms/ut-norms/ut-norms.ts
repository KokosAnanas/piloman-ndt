import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-ut-norms',
    imports: [Card, Button],
    templateUrl: './ut-norms.html',
    styleUrl: './ut-norms.scss'
})
export class UtNorms {
    @Output() close = new EventEmitter<void>();
}
