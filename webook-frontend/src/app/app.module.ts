import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserHomeComponent,
    UserBookingsComponent,
    RoomsComponent,
    RoomComponent,
    BookRoomComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'signin'}, 
      { path: 'signin', component: SignInComponent}, 
      { path: 'user', component: UserHomeComponent},
      { path: 'signup', component: SignUpComponent}, 
      { path: '**', redirectTo: 'signin'}, 
    ]),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
function forRoot(arg0: never[]): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

