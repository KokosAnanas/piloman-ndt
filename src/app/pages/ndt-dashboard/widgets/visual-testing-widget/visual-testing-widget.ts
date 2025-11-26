import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-visual-testing-widget',
    imports: [Button, Card],
    templateUrl: './visual-testing-widget.html',
    styleUrl: './visual-testing-widget.scss'
})
export class VisualTestingWidget {}
