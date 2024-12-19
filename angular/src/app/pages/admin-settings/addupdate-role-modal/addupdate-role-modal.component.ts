import { F } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  AddOrRemoveRolesDto,
  GetAllUserDto,
  GetAvaialbleRolesDto,
  UserServices,
} from 'src/servicesv2/nswag/nswag-services';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { AdminUserManagementComponent } from '../admin-user-management/admin-user-management.component';

@Component({
  selector: 'app-addupdate-role-modal',
  standalone: true,
  imports: [
    MaterialModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ToastrServComponent,
  ],
  templateUrl: './addupdate-role-modal.component.html',
  styleUrl: './addupdate-role-modal.component.scss',
})
export class AddupdateRoleModalComponent implements OnInit {
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;
  displayedColumns1: string[] = ['roles'];

  constructor(
    private userServ: UserServices,
    private Usermngt: AdminUserManagementComponent
  ) {}
  ngOnInit(): void {}

  visible: boolean = false;
  visible1: boolean = false;

  data: GetAllUserDto[] = [];
  userId: string = '';
  onShowRole(userdata: GetAllUserDto[]) {
    this.data = userdata;
    this.visible = true;

    this.userId = this.data[0].userId;
  }

  onRemove(role: string, userid: string) {
    // alert(userid + ' ' + role);
    this.visible = false;
    this.toastrComp.confirmAction(
      'Are you sure?',
      "You won't be able to revert this!",
      'warning',
      'Yes',
      'No',
      () => {
        this.onSaveRole(2, role);
      }
    );
  }

  onAddRole() {
    this.visible1 = true;

    this.onDropDownRoles();
  }

  datasave: AddOrRemoveRolesDto = new AddOrRemoveRolesDto();
  onSaveRole(btnClick: number, role: string) {
    debugger;

    if (btnClick == 2) {
      this.datasave.role = role;
    }
    this.datasave.userId = this.userId;
    this.datasave.buttonClick = btnClick;
    this.userServ.addOrRemoveRoles(this.datasave).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.Usermngt.onDisplayUser();
          this.toastrComp.showtoastr('Success', res.data);
          this.visible = false;
          this.visible1 = false;
        } else {
          this.toastrComp.showtoastrInfo('Info', res.data);
          this.Usermngt.onDisplayUser();
        }
      },
    });
  }

  availRoles: GetAvaialbleRolesDto[] = [];
  onDropDownRoles() {
    this.userServ.getAvaialbleRoles(this.userId).subscribe({
      next: (res) => {
        this.availRoles = res.data;
        console.log(this.availRoles);
      },
    });
  }
}
