import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User_Request, Create_User_Response } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent extends BaseComponent {
  createForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) {
    super();
  }
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required,
          Validators.minLength(4)
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }
  get passwordConfirm() {
    return this.createForm.getError('notSame') ? true : false
  }


  async onSubmit(createUser: Create_User_Request) {
    console.log(createUser.username);
    if (this.createForm.valid) {
      let response = await this.userService.create(createUser);
      if (response.succeeded) {
        this.router.navigate([""]);
        this.toastrService.message(response.message, "Kullanıcı ekleme işlemi başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight });
      }
      else
        this.toastrService.message(response.message, "Kullanıcı ekleme işlemi başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight });

      console.log(response);
    } else {
      console.log('Form is invalid!');
    }


  }
}
