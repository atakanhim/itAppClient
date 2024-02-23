import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {

  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userAuthService: UserAuthService, private toastrService: CustomToastrService) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {

    if (this.loginForm.valid) {
      let result = await this.userAuthService.login(this.loginForm.value.username, this.loginForm.value.password)
      if (result) {
        this.router.navigate(["admin"]);
        this.toastrService.message("login basarili", "Basarili", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
      }
      else
        this.toastrService.message("login başarısız", "Başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })

    }
    else
      console.log('Form is invalid!');

  }

}
