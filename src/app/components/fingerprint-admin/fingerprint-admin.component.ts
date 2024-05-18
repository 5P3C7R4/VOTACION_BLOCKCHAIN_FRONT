import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fingerprint-admin',
  standalone: true,
  imports: [],
  templateUrl: './fingerprint-admin.component.html',
  styleUrl: './fingerprint-admin.component.scss'
})
export class FingerprintAdminComponent implements AfterViewInit {

  private counter: number = 0;

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    var el = document.getElementById("focused") as HTMLDivElement;
    el.focus();
  }

  handleKeyPress(key: KeyboardEvent) {
    if (key.code == "Space") {
      this.counter++;
      if (this.counter === 3) {
        let toast = this.toastr.success("Huella escaneada con éxito")
        toast.onHidden.subscribe({ next: () => setTimeout(() => this.navigate(), 500) })
      }
    } else {
      this.counter = 0;
    }
  }

  navigate(): void {
    this.router.navigate(['./voting'])
  }
}
