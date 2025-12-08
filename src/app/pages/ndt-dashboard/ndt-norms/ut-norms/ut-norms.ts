import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-ut-norms',
    imports: [TableModule, Card],
    templateUrl: './ut-norms.html',
    styleUrl: './ut-norms.scss'
})
export class UtNorms {}
