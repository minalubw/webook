import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from './state.service';

function bootstrap(stateService: StateService) {
  return () => {
    const persisted_state = localStorage.getItem('APP_STATE');
    if (persisted_state) {
      stateService.setState(JSON.parse(persisted_state));
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    UserHomeComponent,
    UserBookingsComponent,
    RoomsComponent,
    RoomComponent,
    BookRoomComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'signin'}, 
      { path: 'signin', component: SignInComponent}, 
      { path: 'signup', component: SignUpComponent}, 
      { path: '**', redirectTo: 'signin'}, 
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: bootstrap, deps: [StateService], multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }


