import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseError } from '@angular/fire/app';
import { environment } from '../../../environment/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/[0-9]{6,13}/)]],
      password: [null, [Validators.required]]
    })
  }

  async login() {
    this.userService.login(this.form.value)
      .then(() => {
        this.router.navigate(['voting'])
      }).catch((err: FirebaseError) => {
        this.toastr.error(err.message, "Error");
      })
  }
}
