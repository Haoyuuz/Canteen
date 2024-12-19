import { Component, OnInit, ViewChild } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import {
  CanteenServices,
  GetAllMenuCategoryDto,
} from 'src/servicesv2/nswag/nswag-services';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { FormsModule } from '@angular/forms';
import { AddUpdateProductcatModalComponent } from '../add-update-productcat-modal/add-update-productcat-modal.component';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hrate: number;
  skills: string;
  priority: string;
  progress: string;
}

@Component({
  selector: 'app-admin-product-category',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrServComponent,
    FormsModule,
    AddUpdateProductcatModalComponent,
  ],
  templateUrl: './admin-product-category.component.html',
  styleUrl: './admin-product-category.component.scss',
})
export class AdminProductCategoryComponent implements OnInit {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;
  @ViewChild(AddUpdateProductcatModalComponent)
  AddUpdateProdCatModal!: AddUpdateProductcatModalComponent;
  constructor(private canteenServ: CanteenServices) {}
  ngOnInit(): void {
    this.onDisplayProductCategory();
  }

  searchCategory: string = '';
  onSearchCategory() {
    this.onDisplayProductCategory(0, 5);
  }

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['Category Name', 'Action'];
  totalRecords = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: GetAllMenuCategoryDto[] = [];
  onDisplayProductCategory(pageIndex: number = 0, pageSize: number = 5) {
    this.canteenServ
      .getAllMenuCategory1(pageIndex, pageSize, this.searchCategory)
      .subscribe({
        next: (res: any) => {
          if (res.data && res.data.length > 0) {
            this.totalRecords = res.data[0].totalRecords;
          }
          this.dataSource.data = res.data;
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
      });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    const pageIndex = event.pageIndex;
    this.onDisplayProductCategory(pageIndex, this.pageSize);
  }

  onDeleteProductCategory() {
    this.toastrComp.confirmAction(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      'Yes',
      'No',
      () => {
        // this.canteenServ.deleteMenuCategory(id).subscribe({
        //   next: (res) => {
        //     if (res.isSuccess) {
        //       this.toastrComp.showtoastr(res.data, 'Success');
        //       this.onDisplayProductCategory();
        //     }
        //   },
        // });
      }
    );
  }

  onAddProductCategory(catid: string, catName: string) {
    this.AddUpdateProdCatModal.onCreateUpdate(catid, catName);
  }
}
