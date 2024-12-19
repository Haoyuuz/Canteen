import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import {
  CanteenServices,
  CreateOrEditItemDto,
  CreateOrEditOrdersDto,
  UserServices,
} from 'src/servicesv2/nswag/nswag-services';
import { authservice } from 'src/servicesv2/user-services/auth-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [DialogModule, ButtonModule, ToastrServComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  @ViewChild(UserDashboardComponent) userdashboard!: UserDashboardComponent;
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;

  constructor(
    private canteenServ: CanteenServices,
    private userDash: UserDashboardComponent,
    private authServ: authservice
  ) {}

  userid: string = '';
  ngOnInit(): void {
    this.userid = this.authServ.getUserId() || '';

    this.getCartItem();
  }

  useritem: CreateOrEditItemDto[] = [];
  getCartItem() {
    const itemStr = localStorage.getItem('cartItems');

    const itemJson = itemStr
      ? JSON.parse(itemStr)
      : { items: [], totalPrice: 0 };

    const itemsValue = itemJson.value || [];

    this.useritem = itemsValue.map((item: any) => {
      const dto = CreateOrEditItemDto.fromJS({
        itemId: item.id,
        quantity: item.quantity,
      });
      return dto;
    });
  }

  // staffid: string = '';
  data1: CreateOrEditOrdersDto = new CreateOrEditOrdersDto();
  onUserOrder(userpaymentmethod: string) {
    debugger;
    this.data1.customerId = this.userid;
    this.data1.items = this.useritem;
    this.data1.paymentMethod = userpaymentmethod;
    this.canteenServ.createUserOrders(this.data1).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          if (res.data) {
            this.toastrComp.showtoastr(res.data, 'Success');
            localStorage.removeItem('cartItems');

            this.userDash.resetCartData();
          }

          this.visible = false;
          return;
        } else {
          this.toastrComp.showtoastrInfo('Notice', res.errorMessage);
        }
      },
    });
  }

  visible: boolean = false;
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;

  showDialog() {
    this.visible = true;
    this.getCartItem();
  }
  showDialog1() {
    this.visible1 = true;
  }
  showDialog2() {
    this.visible = false;

    this.toastrComp.confirmAction(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      'Yes',
      'No',
      () => {
        this.onUserOrder('SalaryDeduction');
      }
    );
  }

  showDialog3() {
    this.visible = false;

    this.toastrComp.confirmAction(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      'Yes',
      'No',
      () => {
        this.onUserOrder('PayAtTheCounter');
      }
    );
  }
}
