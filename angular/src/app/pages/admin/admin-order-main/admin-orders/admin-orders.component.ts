import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';
import {
  CanteenServices,
  GetAllUserItemDto,
  GetAllUserItemHeaderDto,
} from 'src/servicesv2/nswag/nswag-services';
import { AdminOrderDetailsComponent } from '../admin-order-details/admin-order-details.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    MaterialModule,
    MatCardModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    AdminOrderDetailsComponent,
  ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss',
})
export class AdminOrdersComponent implements OnInit {
  @ViewChild(AdminOrderDetailsComponent) ordstat!: AdminOrderDetailsComponent;

  constructor(private canteenServ: CanteenServices) {}
  ngOnInit(): void {
    this.onGetAllUserOrderToday();
  }

  visible1: boolean = false;

  selectedOrder: GetAllUserItemHeaderDto | null = null;

  viewOrderItemDetails(orderitem: GetAllUserItemHeaderDto) {
    this.selectedOrder = orderitem;
    this.visible1 = true;
  }

  selectedOrderDetails: GetAllUserItemHeaderDto | null = null;
  viewOrderDetails(orderdetails: GetAllUserItemHeaderDto) {
    this.ordstat.viewOrderDetails(orderdetails);
  }

  data: GetAllUserItemHeaderDto[] = [];
  onGetAllUserOrderToday() {
    this.canteenServ.getAllUserOrder().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.data = res.data;

          console.log(this.data);
        }
      },
    });
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
}
