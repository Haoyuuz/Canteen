import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { authservice } from 'src/servicesv2/user-services/auth-service';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    MaterialModule,
    MatButtonModule,
    ToastrServComponent,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;

  constructor(private authserv: authservice) {}

  onClickLogout() {
    this.authserv.onlogout();

    this.toastrComp.showtoastr('Logout Successfully', 'Good Bye');
  }
}
