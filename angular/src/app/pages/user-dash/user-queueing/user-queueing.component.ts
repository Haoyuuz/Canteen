import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import { orderItem, userOrderModel } from 'src/model/order/getuserorder';
import {
  CanteenServices,
  GetUserItemHeader,
  GetUserOrderParams,
} from 'src/servicesv2/nswag/nswag-services';
// import { CanteenServices } from 'src/servicesv2/nswag/nswag-services';
import { orderService } from 'src/servicesv2/order-services/order-services';
import { authservice } from 'src/servicesv2/user-services/auth-service';

@Component({
  selector: 'app-user-queueing',
  standalone: true,
  imports: [
    MaterialModule,
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    DialogModule,
    RouterLink,
    CalendarModule,
  ],
  templateUrl: './user-queueing.component.html',
  styleUrl: './user-queueing.component.scss',
})
export class UserQueueingComponent implements OnInit {
  constructor(
    private orderServ: orderService,
    private canteenServ: CanteenServices,
    private authServ: authservice
  ) {}
  userid: string = '';
  ngOnInit(): void {
    this.userid = this.authServ.getUserId() || '';

    this.onGetUserOrder();
  }

  dateFrom: Date | undefined;
  dateTo: Date | undefined;

  data: GetUserItemHeader[] = [];
  params: GetUserOrderParams = new GetUserOrderParams();

  onGetUserOrder() {
    this.params.id = this.userid;
    (this.params.dateFrom = this.dateFrom),
      (this.params.dateTo = this.dateTo),
      this.canteenServ.getUserOrder(this.params).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.data = res.data;

            console.log(this.data);
          }
        },
      });
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  selectedOrder: GetUserItemHeader | null = null;

  viewOrderDetails(order: GetUserItemHeader) {
    this.selectedOrder = order;
    this.visible = true;
  }

  statusString(status: number): string {
    if (status === 0) {
      return 'In Progress';
    }
    if (status === 1) {
      return 'Done';
    }
    if (status === 2) {
      return 'Cancelled';
    }
    return '';
  }

  getBadgeClass(status: number): string {
    switch (status) {
      case 1:
        return 'bg-primary';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  cartItems: string[] = [];
  cartQty: string[] = [];

  currentPage = 1;
  itemsPerPage = 8;

  // Calculate total pages for the menu
  get totalMenuPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  // Handle page change
  changePage(page: number) {
    if (page >= 1 && page <= this.totalMenuPages) {
      this.currentPage = page;
    }
  }
}
