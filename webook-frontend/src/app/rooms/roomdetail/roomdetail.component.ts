import { Component, OnInit, inject } from '@angular/core';
import { IRoom, RoomService } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.css']
})
export class RoomdetailComponent implements OnInit {
  roomService = inject(RoomService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  room!: IRoom;
  roomId!: string;

  ngOnInit(): void {
    this.roomId = this.activedRouter.snapshot.params['room_id'];
    this.roomService.getRoomById(this.roomId).subscribe(res=>{
      this.room = res.data
      console.log(res.data)
    })
  }

  goToAddReservation(){
     this.router.navigate(['/reservations/add/' + this.roomId]);
  }
}
