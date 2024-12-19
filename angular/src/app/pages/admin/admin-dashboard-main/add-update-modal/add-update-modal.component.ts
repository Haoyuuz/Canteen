import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { createOrEditMenuModel } from 'src/model/menu/createOrEditMenu-model';
import { menuServices } from 'src/servicesv2/menu-services/menu-services';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { AdminMenuTableComponent } from '../admin-menu-table/admin-menu-table.component';

@Component({
  selector: 'app-add-update-modal',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ToastrServComponent],
  templateUrl: './add-update-modal.component.html',
  styleUrl: './add-update-modal.component.scss',
})
export class AddUpdateModalComponent implements OnInit {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private menuServ: menuServices,
    private adminMenu: AdminMenuTableComponent
  ) {}
  ngOnInit(): void {
    this.onDisplayCategory();
  }

  visible: boolean = false;
  isRequired = true;

  showDialog(id: string) {
    this.visible = true;
    this.isRequired = true;

    if (id != '') {
      this.isRequired = false;
      this.onGetMenuItemById(id);
    }
  }

  categoryData: { id: string; categoryName: string }[] = [];

  onDisplayCategory() {
    this.menuServ.getAllCategory().subscribe({
      next: (res) => {
        this.categoryData = res.data;
      },
    });
  }

  data: createOrEditMenuModel = new createOrEditMenuModel();
  onCreateUpdate() {
    debugger;
    const formData = new FormData();

    formData.append('id', this.data.id ? this.data.id : '');
    formData.append('itemName', this.data.itemName);
    formData.append('categoryId', this.data.categoryId);
    formData.append('itemDesc', this.data.itemDesc);
    formData.append('price', (this.data.price ?? 0).toString());
    formData.append('stockQuantity', (this.data.stockQuantity ?? 0).toString());

    if (this.data.file) {
      formData.append('file', this.data.file, this.data.file.name);
    }

    this.menuServ.CreateUpdateReqSub(formData).subscribe({
      next: (res) => {
        console.log(res);

        if (res.isSuccess) {
          this.visible = false;
          this.toastrComp.showtoastr(res.data, 'Success');
          this.adminMenu.getMenu();
        }
      },
      error: (err) => {
        console.log(err);
        this.visible = false;
      },
      complete: () => {
        this.visible = false;
        this.clearFileInput();
      },
    });
  }

  onGetMenuItemById(id: string) {
    this.menuServ.getMenuById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.data = res.data;

          console.table(this.data);
        }
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.data.file = file;
    }
  }

  clearFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
      this.data = new createOrEditMenuModel();
    }
  }

  onHideDialog() {
    this.clearFileInput();
  }
}
