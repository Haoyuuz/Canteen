import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { getMenu } from 'src/model/menu/getAllOrGetById-menu';
import { getMenuModel } from 'src/model/menu/getAllOrGetById-menu.model';
import { menuServices } from 'src/servicesv2/menu-services/menu-services';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AddUpdateModalComponent } from '../add-update-modal/add-update-modal.component';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';

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

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/dash-prd-1.jpg',
    uname: 'Minecraf App',
    position: 'Jason Roy',
    skills: '3.5',
    hrate: 73.2,
    priority: 'Low',
    progress: 'success',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/dash-prd-2.jpg',
    uname: 'Web App Project',
    position: 'Mathew Flintoff',
    skills: '3.5',
    hrate: 73.2,
    priority: 'Medium',
    progress: 'warning',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/dash-prd-3.jpg',
    uname: 'Modernize Dashboard',
    position: 'Anil Kumar',
    skills: '3.5',
    hrate: 73.2,
    priority: 'Very High',
    progress: 'accent',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/dash-prd-4.jpg',
    uname: 'Dashboard Co',
    position: 'George Cruize',
    skills: '3.5',
    hrate: 73.2,
    priority: 'High',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/dash-prd-4.jpg',
    uname: 'Dashboard Co',
    position: 'George Cruize',
    skills: '3.5',
    hrate: 73.2,
    priority: 'High',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/dash-prd-4.jpg',
    uname: 'Dashboard Co',
    position: 'George Cruize',
    skills: '3.5',
    hrate: 73.2,
    priority: 'High',
    progress: 'error',
  },
];
@Component({
  selector: 'app-admin-menu-table',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    TableModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    AddUpdateModalComponent,
    ToastrServComponent,
  ],
  templateUrl: './admin-menu-table.component.html',
  styleUrl: './admin-menu-table.component.scss',
})
export class AdminMenuTableComponent implements OnInit {
  @ViewChild(AddUpdateModalComponent) addUpdateModal!: AddUpdateModalComponent;
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;

  constructor(private menuServ: menuServices) {}

  ngOnInit(): void {
    this.getMenu();
  }

  currentPage = 1;
  itemsPerPage = 10;

  changePage(page: number) {
    this.currentPage = page;
  }

  changePageSize(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(selectElement.value);
  }

  id: string = '';

  data: getMenuModel[] = [];
  getMenu() {
    this.menuServ.getAllOrGetById(this.id).subscribe({
      next: (res) => {
        if (typeof res.data === 'string') {
          this.data = JSON.parse(res.data) as getMenu[];
        } else {
          this.data = res.data; // Ensure it's of type getMenu[]
        }
      },
    });
  }

  onAddUpdate(id: string) {
    this.addUpdateModal.showDialog(id);
  }

  onDeleteProduct() {
    this.toastrComp.confirmAction(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      'Yes',
      'No'
    );
  }
}
