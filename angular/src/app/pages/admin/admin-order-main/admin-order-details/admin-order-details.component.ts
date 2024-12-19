import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  CanteenServices,
  GetAllUserItemHeaderDto,
  UpdateOrderDetailsDto,
} from 'src/servicesv2/nswag/nswag-services';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { authservice } from 'src/servicesv2/user-services/auth-service';

@Component({
  selector: 'app-admin-order-details',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ToastrServComponent,
  ],
  templateUrl: './admin-order-details.component.html',
  styleUrl: './admin-order-details.component.scss',
})
export class AdminOrderDetailsComponent {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;
  constructor(
    private canteenServ: CanteenServices,
    private orderAdComp: AdminOrdersComponent,
    private authserv: authservice
  ) {}

  staffId: string | '' = this.authserv.getUserId() ?? '';

  selectedOrderDetails: GetAllUserItemHeaderDto | null = null;
  userChange: number = 0;
  visible: boolean = false;
  getLatestLogs: number = 0;

  viewOrderDetails(orderdetails: GetAllUserItemHeaderDto) {
    this.visible = true;
    this.selectedOrderDetails = orderdetails;
    this.userChange = Math.max(
      0,
      (this.selectedOrderDetails.amountPaid || 0) -
        this.selectedOrderDetails.totalAmount
    );

    //gets the latest logs of the user order
    this.getLatestLogs =
      orderdetails.userLogs[orderdetails.userLogs.length - 1]?.status ?? 0;
  }

  data: UpdateOrderDetailsDto = new UpdateOrderDetailsDto();
  onSaveDetailsUpdate(
    orderdetails: GetAllUserItemHeaderDto,
    buttonClick: number,
    orderstatus: number
  ) {
    this.data.staffId = this.staffId;
    this.data.paymentId = orderdetails.paymentId;
    this.data.amountPaid = orderdetails.amountPaid;
    this.data.orderTableId = orderdetails.orderId;
    this.data.orderStatus = orderdetails.status;
    this.data.orderLogsId = orderdetails.orderLogsId;
    this.data.orderLogsStatus = orderstatus;
    this.data.buttonClick = buttonClick;

    this.canteenServ.updateOrderDetails(this.data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.toastrComp.showtoastr('Success', res.data);
        } else {
          this.toastrComp.showtoastr('Info', res.data);
        }

        this.onReset();
        this.visible = false;
      },
    });
  }

  onReset() {
    this.data = new UpdateOrderDetailsDto();
    this.orderAdComp.onGetAllUserOrderToday();
  }
}
