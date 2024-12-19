import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  CanteenServices,
  CreateOrEditMenuCategoryDto,
} from 'src/servicesv2/nswag/nswag-services';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { AdminProductCategoryComponent } from '../admin-product-category/admin-product-category.component';

@Component({
  selector: 'app-add-update-productcat-modal',
  standalone: true,
  imports: [
    MaterialModule,
    DialogModule,
    ToastrServComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-update-productcat-modal.component.html',
  styleUrl: './add-update-productcat-modal.component.scss',
})
export class AddUpdateProductcatModalComponent {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;

  constructor(
    private canteenServ: CanteenServices,
    private adminProdCat: AdminProductCategoryComponent
  ) {}

  visible: boolean = false;
  catName: string = '';
  catId: string = '';

  data: CreateOrEditMenuCategoryDto = new CreateOrEditMenuCategoryDto();
  onCreateUpdate(CatId: string = '', CatName: string) {
    this.catName = CatName;
    this.visible = true;

    this.catId = CatId;
  }

  onSave() {
    this.data.id = this.catId;
    this.data.categoryName = this.catName;
    this.canteenServ.createOrEditMenuCategory(this.data).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.toastrComp.showtoastr(res.data, 'Success');
          this.adminProdCat.onDisplayProductCategory();
          this.visible = false;
        }
      },
    });
  }
}
