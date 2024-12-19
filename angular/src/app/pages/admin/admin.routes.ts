import { Routes } from '@angular/router';

//Pages

import { AdminOrdersComponent } from './admin-order-main/admin-orders/admin-orders.component';
import { AdminDashboardComponent } from './admin-dashboard-main/admin-dashboard/admin-dashboard.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'admin-order',
        component: AdminOrdersComponent,
      },
    ],
  },
];
