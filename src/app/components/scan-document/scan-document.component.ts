import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-scan-document',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './scan-document.component.html',
  styleUrl: './scan-document.component.scss'
})
export class ScanDocumentComponent {

  public document: string = "";

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  @HostListener("document:keydown", ['$event'])
  handleKeyPress(key: KeyboardEvent) {
    if (["Enter"].includes(key.code) && this.document.length > 7) {
      try {
        if (isNaN(parseInt(this.document)) || parseInt(this.document).toString().length != this.document.length) {
          throw new Error()
        }
        this.userService.document = parseInt(this.document).toString();
        this.userService.verifyDocument().subscribe({
          next: () => {
            let toast = this.toastr.success("Documento escaneado con éxito")
            toast.onHidden.subscribe({ next: () => setTimeout(() => this.navigate(), 500) })
          },
          error: (err: HttpErrorResponse) => {
            console.log("🚀 ~ ScanDocumentComponent ~ this.userService.verifyDocument ~ err:", err)
            this.toastr.error(err.error.res)
          }
        })
      } catch (err) {
        this.toastr.error("Documento no válido")
      }
    } else if (["Enter"].includes(key.code)) {
      this.toastr.error("Ingrese un documento válido")
    }
  }

  navigate(): void {
    this.router.navigate(['./fingerprint'])
  }
}
