import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { BookRoomComponent } from './book-room/book-room.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserHomeComponent,
    UserBookingsComponent,
    RoomsComponent,
    RoomComponent,
    BookRoomComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
