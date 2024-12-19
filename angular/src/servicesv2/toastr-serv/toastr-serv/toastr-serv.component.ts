import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-toastr-serv',
  standalone: true,
  imports: [],
  templateUrl: './toastr-serv.component.html',
  styleUrl: './toastr-serv.component.scss',
})
export class ToastrServComponent {
  constructor(private toastr: ToastrService) {}

  showtoastr(title: string, message: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  showtoastrInfo(title: string, message: string) {
    this.toastr.info(message, title, {
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  showSweetalert(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success', // You can change this to 'success', 'error', etc.
      confirmButtonText: 'Okay',
    });
  }

  confirmAction(
    title: string,
    text: string,
    icon: 'warning' | 'error' | 'success' | 'info',
    confirmButtonText: string,
    cancelButtonText: string,
    callback?: () => void // Callback function
  ) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        // Execute the callback if provided
        if (callback) {
          callback();
        }
        Swal.fire('Confirmed!', 'Your action has been confirmed.', 'success');
      }
    });
  }

  onCustomDialog(title: string, message: string) {
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
