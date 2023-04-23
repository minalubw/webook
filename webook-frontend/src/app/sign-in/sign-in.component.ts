import { Component, inject } from '@angular/core';
import { IUser, UserService } from '../user.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  private userService = inject(UserService);
  private stateService = inject(StateService);
  private router = inject(Router);
  private notification = inject(ToastrService);

  mySignInForm = inject(FormBuilder).nonNullable.group({
     email: ['', Validators.required],
     password: ['', Validators.required],
  });

  signin() {
    this.userService.signin(this.mySignInForm.value as IUser).subscribe(
      response => {
        if(response.success){
          this.notification.success('Successfully logged in.');
          const encrypted_token = response.data;
          const decoded_token = jwt_decode(encrypted_token) as IUser;
          this.stateService.setState({
            ...decoded_token,
            jwt: encrypted_token});
        }
      }
    )}
}


