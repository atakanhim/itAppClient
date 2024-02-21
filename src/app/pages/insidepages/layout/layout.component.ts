import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { StoksComponent } from '../stoks/stoks.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,StoksComponent,DashboardComponent,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
