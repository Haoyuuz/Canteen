import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import {
  CanteenServices,
  RegisterUserDto,
  UserServices,
} from 'src/servicesv2/nswag/nswag-services';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { authservice } from 'src/servicesv2/user-services/auth-service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    FormsModule,
    RouterLink,
    ToastrServComponent,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;

  constructor(
    private userServ: UserServices,
    private router: Router,
    private authserv: authservice
  ) {}

  data: RegisterUserDto = new RegisterUserDto();
  onLogin() {
    this.userServ.login(this.data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          localStorage.setItem('token', res.data.userToken);

          const userRole = this.authserv.getUserRoles() || 'No role';

          console.log(userRole);

          if (userRole.includes('Staff') || userRole.includes('Admin')) {
            this.router.navigate(['/admin/admin-order']);
          } else {
            this.router.navigate(['/user/userdashboard']);
          }

          this.toastrComp.showtoastr('Success', 'Hello ' + res.data.userName);
        } else {
          this.toastrComp.showtoastrInfo('Info', res.errorMessage);
        }
      },
    });
  }
}
