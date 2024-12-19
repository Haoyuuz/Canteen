import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AdminMenuTableComponent } from '../admin-menu-table/admin-menu-table.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MaterialModule, AdminMenuTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
