import { Component, inject } from '@angular/core';
import { IReservation, ReservationService } from '../reservation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent {

  reservationService = inject(ReservationService);
  reservations!: IReservation[];
  subscription!: Subscription;


  ngOnInit(): void{
    this.subscription =  this.reservationService.getAllReservationsForUser().subscribe(res=>{
      if(res.success){
        this.reservations = res.data;
      }
    })
    console.log(this.reservations);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
