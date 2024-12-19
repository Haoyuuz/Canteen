import { Routes } from '@angular/router';
import { AdminMaintenanceDashboardComponent } from './admin-maintenance-dashboard/admin-maintenance-dashboard.component';

export const AdminMaintenanceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-maintenance',
        component: AdminMaintenanceDashboardComponent,
      },
    ],
  },
];
