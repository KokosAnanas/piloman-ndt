import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-rt-norms',
    imports: [Card, Button],
    templateUrl: './rt-norms.html',
    styleUrl: './rt-norms.scss'
})
export class RtNorms {
    @Output() close = new EventEmitter<void>();
}
