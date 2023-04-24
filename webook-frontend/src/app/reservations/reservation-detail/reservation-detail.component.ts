import { Component, inject } from '@angular/core';
import { IReservation, ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent {
  reservationId!: string;
  reservationService = inject(ReservationService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  reservation!: IReservation;
  subscription!: Subscription;
  


  ngOnInit(): void{
    this.reservationId = this.activedRouter.snapshot.params['reservation_id'];
    this.subscription = this.reservationService.getOneReservationForUser(this.reservationId).subscribe(res=>{
      this.reservation = res.data;
    });
  }

  goToUpdate(){
    return this.router.navigate(['reservations', 'update', this.reservationId]);
  }

  getCurrentInfo(){
    return this.reservation;
  }

}
