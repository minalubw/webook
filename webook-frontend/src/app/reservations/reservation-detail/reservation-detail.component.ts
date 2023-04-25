import { Component, inject } from '@angular/core';
import { IReservation, ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  notification = inject(ToastrService);
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

  deleteReservation(){
    this.reservationService.deleteReservation(this.reservationId).subscribe((res)=>{
       if(res.success){
        this.notification.success('Reservation cancelled successfully');
        this.router.navigate(['/reservations']);
       }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  
  }
}
