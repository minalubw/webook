import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'app/state.service';
import { IUser, UserService } from 'app/user.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private notification = inject(ToastrService);
  private stateService = inject(StateService);

  mySignUpForm = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)] 
  })

  signup(event: Event){
    this.userService.signup(this.mySignUpForm.value as IUser)
    .subscribe(res=>{
      if(res.success){
        this.notification.success('Signed up successfully');
        const encryted_token = res.data;
        const decoded_token = jwt_decode(encryted_token) as IUser;
        this.stateService.setState({
          ...decoded_token, jwt: encryted_token
        });
        this.router.navigate(['', 'user']);
      }
    })
  }
}
