import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { IState, StateService } from '../state.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements OnDestroy{
  private http = inject(HttpClient);
  private stateService = inject(StateService);
  private state!: IState;
  private subscription!: Subscription;
  constructor() {
    this.subscription =  this.stateService.getState().subscribe(res=>{this.state = res});
  }

  getRoomById(id: any){
    return this.http.get<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${id}`);
  }

  getNearByRooms(ob: any): Observable<any>{
    return this.http.post<{ success: true, data: IRoom[] }>(`${environment.HTTP_SERVER}/rooms/nearby`, ob);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}

export interface IRoom {
  _id: string;
  type: string;
  price_per_day: number;
  available: string;
  hotel_name: string;
  location: number[];
  pictures: { pictureName: string }[];
  reservations: {
    user_id: string;
    user_name: string;
    user_email: string;
    guest: {
      name: string;
      phone: string;
    };
    checkInDate: Date;
    checkOutDate: Date;
    hotel_name: string;
    room_type: string;
  }[];
}