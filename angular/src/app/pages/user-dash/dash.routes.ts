import { Routes } from '@angular/router';

//Pages
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { UserQueueingComponent } from './user-queueing/user-queueing.component';

export const DashRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userdashboard',
        component: UserDashboardComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'user-que',
        component: UserQueueingComponent,
      },
    ],
  },
];
