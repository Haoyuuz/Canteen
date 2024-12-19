import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';

export const UserAuth: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-login',
        component: UserLoginComponent,
      },
      {
        path: 'user-register',
        component: UserRegistrationComponent,
      },
    ],
  },
];
