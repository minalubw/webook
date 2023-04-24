import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IReservation, ReservationService } from '../reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent {
  reservationService = inject(ReservationService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  roomId!: string;
  private notification = inject(ToastrService);
  createdReservation: IReservation = {
    _id: '',
    guest: {
      name: '',
      phone: ''
    },
    checkInDate: new Date(),
    checkOutDate: new Date()
  };

  reservationForm = inject(FormBuilder).nonNullable.group({
    guest_name: ['', Validators.required],
    guest_phone: ['', Validators.required],
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
  });


  ngOnInit(): void {
    this.roomId = this.activedRouter.snapshot.params['room_id'];
  }

  bookNow() {
    const formValue = this.reservationForm.value;
    const reservation: any = {
      guest: {
        name: formValue.guest_name,
        phone: formValue.guest_phone
      },
      checkInDate: formValue.checkInDate,
      checkOutDate: formValue.checkOutDate
    }
    this.reservationService.addNewReservation(this.roomId, reservation).subscribe((res)=>{
      if(res.success){
        this.createdReservation = res.data;
        this.notification.success('Room booked successfully!');
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    });
  }

  goBackToList(){
    this.router.navigate(['', 'rooms']);
  }
}
