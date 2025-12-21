import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-ut-edges-norms',
    imports: [Card, Button],
    templateUrl: './ut-edges-norms.html',
    styleUrl: './ut-edges-norms.scss'
})
export class UtEdgesNorms {
    @Output() close = new EventEmitter<void>();
}
