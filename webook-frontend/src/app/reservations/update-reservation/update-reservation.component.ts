import { Component, OnInit, inject } from '@angular/core';
import { IReservation, ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  subscription!: Subscription;
  private notification = inject(ToastrService);
  updatedReservation: IReservation = {
    _id: '',
    guest: {
      name: '',
      phone: '',
    },
    checkInDate: new Date(),
    checkOutDate: new Date(),
    hotel_name: '',
    room_type: '',
  };

  beforeUpdate: any

  

  reservationForm = inject(FormBuilder).nonNullable.group({
    guest_name: ['', Validators.required],
    guest_phone: ['', Validators.required],
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
  });

  

  ngOnInit(): void {
    console.log(this.beforeUpdate);
    this.reservationId = this.activedRouter.snapshot.params['reservation_id']
    this.subscription = this.reservationService.getOneReservationForUser(this.reservationId).subscribe((res: any)=>{
      this.beforeUpdate = res.data;
    });
   
  }

  activateForm(){
     this.reservationForm.patchValue({
        guest_name: this.beforeUpdate.guest.name,
        guest_phone: this.beforeUpdate.guest.phone,
        checkInDate: this.beforeUpdate.checkInDate.toISOString().slice(0, 10),
        checkOutDate: this.beforeUpdate.checkOutDate.toISOString().slice(0, 10)
    });
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
