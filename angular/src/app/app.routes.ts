import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { RoleGuard } from 'src/servicesv2/authguard/roleguard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/user-login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user-dash/dash.routes').then((m) => m.DashRoutes),
      },
    ],
    canActivate: [RoleGuard],
    data: {
      roles: ['User'],
    },
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.routes').then((m) => m.AdminRoutes),
      },
    ],
    canActivate: [RoleGuard],
    data: {
      roles: ['Staff', 'Admin'],
    },
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin-maintenance/admin-maintenance.routes').then(
            (m) => m.AdminMaintenanceRoutes
          ),
      },
    ],
    canActivate: [RoleGuard],
    data: {
      roles: ['Admin', 'Staff'],
    },
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/admin-settings/admin-settings.routes').then(
            (m) => m.AdminSettingsRoutes
          ),
      },
    ],
    canActivate: [RoleGuard],
    data: {
      roles: ['Admin'],
    },
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/user-authentication/user-auth.routes').then(
            (m) => m.UserAuth
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
