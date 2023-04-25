import { Component, inject } from '@angular/core';
import { IRoom, RoomService, initial_room } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  roomService = inject(RoomService);
  router = inject(Router);
  roomId!: string;
  activedRoute = inject(ActivatedRoute);

  private notification = inject(ToastrService);
  updatedRoom = initial_room;

  updatedRoomForm = inject(FormBuilder).nonNullable.group({
    type: ['', Validators.required],
    price_per_day: ['', Validators.required],
    hotel_name: ['', Validators.required],
    longitude: ['', Validators.required],
    latitude: ['', Validators.required],
  });


  ngOnInit(): void {
    this.roomId = this.activedRoute.snapshot.params['room_id'];
    this.roomService.getRoomById(this.roomId).subscribe(res=>{
      if(res.success){
        this.displayData(res.data);
      }
    })
  }

  displayData(data: any){
    this.updatedRoomForm.patchValue({
      type: data.type,
      price_per_day: data.price_per_day,
      hotel_name: data.hotel_name,
      longitude: data.location[0],
      latitude: data.location[1]
    });
  }

  updateNow() {
    const formValue = this.updatedRoomForm.value;
    const newRoom: any = {
      type: formValue.type,
      price_per_day: formValue.price_per_day,
      hotel_name: formValue.hotel_name,
      location: [formValue.longitude, formValue.latitude]
    }
    this.roomService.updateRoom(this.roomId, newRoom).subscribe((res)=>{
      if(res.success){
        this.updatedRoom = newRoom;
        this.notification.success('Room Updated successfully!');
      }
    }, (error)=>{
      console.log(error.error.error)
      this.notification.error(error.error.error);
    });
  }

  goBackToList(){
    this.router.navigate(['', 'rooms']);
  }

}
