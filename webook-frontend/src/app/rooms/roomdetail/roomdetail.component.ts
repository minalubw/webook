import { Component, OnInit, inject } from '@angular/core';
import { IRoom, RoomService } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.css']
})
export class RoomdetailComponent implements OnInit {
  roomService = inject(RoomService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  private notification = inject(ToastrService);
  room!: IRoom;
  selectedImage!: File
  roomId!: string;

  ngOnInit(): void {
    this.roomId = this.activedRouter.snapshot.params['room_id'];
    this.roomService.getRoomById(this.roomId).subscribe(res=>{
      this.room = res.data
    })
  }

  deleteRoom(){
    this.roomService.deleteRoom(this.roomId).subscribe((res)=>{
      if(res.success){
        this.notification.success('Room deleted successfully');
        this.router.navigate(['', 'rooms']);
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  }

  onFileSelection(event: any){
    this.selectedImage = event.target.files[0];
  }
  gotToRoomUpdate(){
    this.router.navigate(['rooms', 'update', this.room._id]);
  }
  addPicture(){  
    this.roomService.addPictureToRoom(this.selectedImage, this.roomId).subscribe((res)=>{
      if(res.success){
        this.notification.success('Picture added successfully');
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  }
  goToAddReservation(){
     this.router.navigate(['/reservations/add/' + this.roomId]);
  }
}
