import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';
import {
  API_BASE_URL,
  CanteenServices,
  UserServices,
} from 'src/servicesv2/nswag/nswag-services';
import { AdminOrderDetailsComponent } from './pages/admin/admin-order-main/admin-order-details/admin-order-details.component';
import { AdminOrdersComponent } from './pages/admin/admin-order-main/admin-orders/admin-orders.component';
import { AdminUserManagementComponent } from './pages/admin-settings/admin-user-management/admin-user-management.component';
import { CustomInterceptor } from 'src/servicesv2/interceptor/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    CanteenServices,
    AdminOrdersComponent,
    AdminUserManagementComponent,
    UserServices,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),

    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule
    ),
    {
      provide: API_BASE_URL,
      useValue: 'https://localhost:44348',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
  ],
};
