import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>employees works!</p>`,
  styleUrl: './employees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent { }
