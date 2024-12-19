import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AdminProductCategoryComponent } from '../add-product-category-main/admin-product-category/admin-product-category.component';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-maintenance-dashboard',
  standalone: true,
  imports: [MaterialModule, AdminProductCategoryComponent, MatCardModule],
  templateUrl: './admin-maintenance-dashboard.component.html',
  styleUrl: './admin-maintenance-dashboard.component.scss',
})
export class AdminMaintenanceDashboardComponent {}
