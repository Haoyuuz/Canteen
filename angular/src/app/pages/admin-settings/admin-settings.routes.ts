import { Routes } from '@angular/router';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';

export const AdminSettingsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-settings',
        component: AdminUserManagementComponent,
      },
    ],
  },
];
