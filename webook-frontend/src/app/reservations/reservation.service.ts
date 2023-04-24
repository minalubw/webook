import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { IState, StateService } from 'app/state.service';
import { environment } from 'environments/environment.development';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnDestroy {
  private http = inject(HttpClient);
  // private stateService = inject(StateService);
  // private state!: IState;
  private reserve = initial_reservation;
  private subscription!: Subscription;

  constructor() {
    // this.stateService.getState().subscribe(res=>{this.state = res});
  }

  addNewReservation(roomId: string, reservation: IReservation){
    return this.http.post<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${roomId}/reservations`, reservation);
  }

  updateReservation(reservation_id: string, updated: IReservation){
    return this.http.put<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/reservations/${reservation_id}`, updated)
  }

  getAllReservationsForUser(){
    return this.http.get<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/reservations`);
  }
  
  getOneReservationForUser(reserveId: string){
    return this.http.get<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/reservations/${reserveId}`);
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  
}

export interface IReservation{
  _id: string;
  guest: {
    name: string;
    phone: string;
  };
  checkInDate: string;
  checkOutDate: string;
  hotel_name: string;
  room_type: string;
  room_id: string,
}

export const initial_reservation = {
  _id: '',
  guest: {
    name: '',
    phone: '',
  },
  checkInDate: '',
  checkOutDate: '',
  hotel_name: '',
  room_type: '',
  room_id: ''
}