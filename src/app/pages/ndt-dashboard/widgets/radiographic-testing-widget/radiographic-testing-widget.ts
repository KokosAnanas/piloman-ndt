import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-radiographic-testing-widget',
    imports: [Button, Card],
    templateUrl: './radiographic-testing-widget.html',
    styleUrl: './radiographic-testing-widget.scss'
})
export class RadiographicTestingWidget {}
