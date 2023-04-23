import { Component, inject } from '@angular/core';
import { IState, StateService, initial_state } from './state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 state!: IState;
 subscription!: Subscription;
 private stateService = inject(StateService);
 private router = inject(Router);

 constructor(){
  this.subscription = this.stateService.getState().subscribe(state=>{
    this.state = state;
  });
 }

 signOut(){
  this.stateService.setState(initial_state);
  this.router.navigate(['', 'signin'])
}

goToSignIn(){
  this.router.navigate(['', 'signin']);
}

goToSignUp(){
  
  this.router.navigate(['', 'signup'])
}

}
