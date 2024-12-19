import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { authservice } from '../user-services/auth-service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authserv: authservice
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current UTC time in seconds

      if (decodedToken.exp < currentTime) {
        this.handleTokenExpiration();
        return throwError(() => new Error('Token expired'));
      }

      const newCloneRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(newCloneRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.handleTokenExpiration();
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private handleTokenExpiration() {
    localStorage.removeItem('token');
    this.authserv.onlogout();
    this.toastr.error(
      'Your session has expired. Please login again to continue using the app',
      'Session Expired',
      {
        progressBar: true,
        positionClass: 'toast-bottom-right',
      }
    );
    this.router.navigate(['/auth/user-login']);
  }
}
