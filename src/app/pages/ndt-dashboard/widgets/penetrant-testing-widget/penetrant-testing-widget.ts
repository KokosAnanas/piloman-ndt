import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-penetrant-testing-widget',
    imports: [Button, Card],
    templateUrl: './penetrant-testing-widget.html',
    styleUrl: './penetrant-testing-widget.scss'
})
export class PenetrantTestingWidget {}
