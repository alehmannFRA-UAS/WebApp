import { Component, Input } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {

  @Input() item: Room | null = null;
  @Input() selected = false;
  private userID = 1;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params['userId']) {
        this.userID = params['userId'];
        console.log('User-ID: ', this.userID);

      }
    });
  }

  public join() {
    if (this.item !== null) {
      this.roomService.joinRoom(this.item.id, this.userID).subscribe({
        next: (res: any) => {
          console.log(res);
          if (this.item) {
            this.router.navigate(['/rooms/', this.item.id, 'conversation'], { queryParams: { userId: this.userID } });
          }
        },
        error: (err: any) => console.log(err)
      });
    }
  }
}
