import { Component, OnInit, inject } from '@angular/core';
import { IReservation, ReservationService, initial_reservation } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css'],
})
export class UpdateReservationComponent implements OnInit{
  reservationService = inject(ReservationService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  reservationId!: string;
  reservationLoaded!: boolean;
  subscription!: Subscription;
  notification = inject(ToastrService);
  updatedReservation: IReservation = initial_reservation;


  reservationForm = inject(FormBuilder).nonNullable.group({
    guest_name: ['', Validators.required],
    guest_phone: ['', Validators.required],
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
  });

  

  ngOnInit(): void {
    this.reservationId = this.activedRouter.snapshot.params['reservation_id'];
    this.getReservation(this.reservationId);
  }

  getReservation(id: string){
    this.subscription = this.reservationService.getOneReservationForUser(this.reservationId).subscribe((res: any)=>{
       this.activateForm(res.data)
    });
    
  }

  activateForm(reservation: IReservation){
    this.reservationForm.patchValue({
        guest_name: reservation.guest.name,
        guest_phone: reservation.guest.phone,
        checkInDate: reservation.checkInDate.toString().slice(0, 10),
        checkOutDate: reservation.checkOutDate.toString().slice(0, 10)
    });
    this.reservationLoaded = true;
  }
 
  updateNow() {
    const formValue = this.reservationForm.value;
    const updated: any = {
      guest: {
        name: formValue.guest_name,
        phone: formValue.guest_phone,
      },
      checkInDate: formValue.checkInDate,
      checkOutDate: formValue.checkOutDate,
    };
    this.reservationService
      .updateReservation(this.reservationId, updated)
      .subscribe(
        (res) => {
          if (res.success) {
            this.updatedReservation = res.data;
            this.notification.success('Reservation updated successfully!');
          }
        },
        (error) => {
          this.notification.error(error.error.error);
        }
      );
  }

  goBackToList() {
    this.router.navigate(['', 'reservations']);
  }
}
