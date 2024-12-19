import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import {
  CanteenServices,
  CustomerDto,
} from 'src/servicesv2/nswag/nswag-services';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MaterialModule, RouterLink, ToastrServComponent, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
})
export class UserRegistrationComponent {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;

  constructor(private canteenServ: CanteenServices, private router: Router) {}

  data: CustomerDto = new CustomerDto();

  confirmPass: string = '';

  onClickReg() {
    if (this.data.password != this.confirmPass) {
      this.toastrComp.showtoastrInfo('Notice', "Password doesn't match");
      return;
    }

    this.toastrComp.confirmAction(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      'Yes',
      'No',
      () => {
        this.onRegister();
      }
    );
  }
  onRegister() {
    this.canteenServ.createOrEditCustomer(this.data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.toastrComp.showtoastr('Success', res.data);
          this.router.navigate(['/auth/user-login']);
        } else {
          this.toastrComp.showtoastrInfo('Info', res.data);
        }
      },
    });
  }
}
