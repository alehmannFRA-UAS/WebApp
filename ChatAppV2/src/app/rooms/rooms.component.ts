import { Component } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  name: any = '';
  rooms: Array<Room> = [];
  selectedRoom: Room | null = null;
  searchRoom: string = '';

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.roomService.getAll().subscribe({
      next: (res: any) => {
        console.log(res);
        this.rooms = res;
      },
      error: (err: any) => console.log(err.error)
    });
  }

  createRoom(): void {
    this.roomService.createRoom(this.name).subscribe({
      next: (room) => {
        this.rooms.push(room);
        this.name = '';
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  search(): void {
    this.selectedRoom = null;
    for (const room of this.rooms) {
      if (room.name === this.searchRoom) {
        this.select(room);
      }
    }
  }

  select(r: Room): void {
    this.selectedRoom = r;
  }
}
