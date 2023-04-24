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
  private stateService = inject(StateService);
  private state!: IState;
  private subscription!: Subscription;

  constructor() {
    this.stateService.getState().subscribe(res=>{this.state = res});
  }

  addNewReservation(roomId: string, reservation: IReservation){
    return this.http.post<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${roomId}/reservations`, reservation);
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
  checkInDate: Date;
  checkOutDate: Date;
}