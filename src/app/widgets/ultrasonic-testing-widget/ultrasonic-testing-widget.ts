import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-ultrasonic-testing-widget',
    imports: [Card, Button],
    templateUrl: './ultrasonic-testing-widget.html',
    styleUrl: './ultrasonic-testing-widget.scss'
})
export class UltrasonicTestingWidget {}
