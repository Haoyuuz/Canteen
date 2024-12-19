import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import {
  GetAllUserDto,
  PagedSortedDto,
  UserServices,
} from 'src/servicesv2/nswag/nswag-services';
import { AddupdateRoleModalComponent } from '../addupdate-role-modal/addupdate-role-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    AddupdateRoleModalComponent,
    MatPaginatorModule,
    FormsModule,
  ],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss',
})
export class AdminUserManagementComponent implements OnInit {
  @ViewChild(AddupdateRoleModalComponent)
  AddUpdateRoleModal!: AddupdateRoleModalComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns1: string[] = [
    'name',
    'email',
    'phonenumber',
    'gender',
    'roles',
    'actions',
  ];

  constructor(private userServ: UserServices) {}
  ngOnInit(): void {
    this.onDisplayUser();
  }

  onSearchString() {
    this.onDisplayUser(0, 5);
  }

  searchstring: string = '';
  dataSource: GetAllUserDto[] = [];
  pagedsorted: PagedSortedDto = new PagedSortedDto();

  onDisplayUser(pageIndex: number = 0, pageSize: number = 5) {
    this.pagedsorted.pageIndex = pageIndex;
    this.pagedsorted.pageSize = pageSize;
    this.pagedsorted.searchstring = this.searchstring;
    this.userServ.getAllUser(this.pagedsorted).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource = res.data;

          if (res.data && res.data.length > 0) {
            this.totalRecords = res.data[0].totalRecords;
          }
        }
      },
    });
  }

  totalRecords = 0;
  pageSize = 5;
  pageIndex = 0;

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    const pageIndex = event.pageIndex;
    this.onDisplayUser(pageIndex, this.pageSize);
  }

  data: GetAllUserDto[] = [];
  onAddRole(data: GetAllUserDto) {
    // this.AddUpdateRoleModal.onShowRole(data);
    this.AddUpdateRoleModal.onShowRole([data]);
  }
}
