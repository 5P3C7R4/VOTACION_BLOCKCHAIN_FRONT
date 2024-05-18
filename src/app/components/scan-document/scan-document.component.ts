import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  handleKeyPress(key: KeyboardEvent) {
    if (key.code == "Enter" && this.document.length > 7) {
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
            this.toastr.error(err.error)
          }
        })
      } catch (err) {
        this.toastr.error("Documento no válido")
      }
    } else if (key.code == "Enter") {
      this.toastr.error("Documento no válido")
    }
  }

  navigate(): void {
    this.router.navigate(['./fingerprint'])
  }
}
