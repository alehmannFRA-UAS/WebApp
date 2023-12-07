import { Component } from '@angular/core';
import { Room } from '../room';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  name: any = '';
  rooms: Array<Room> = [];
  selectedRoom: Room | null = null;
  searchRoom: string  = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const url = 'http://127.0.0.1:8000/users/1/chatrooms';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    this.http.get<any>(url, { headers }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.rooms = res;
      },
      error: (err: any) => console.log(err.error)
    });
  }

  createRoom(): void {
    const url = 'http://127.0.0.1:8000/users/1/chatrooms';

    const headers = new HttpHeaders().set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    this.http.post<Room>(url, this.name , { headers }).subscribe({
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
    for(const room of this.rooms){
      if(room.name === this.searchRoom){
        this.select(room);
      }
    }
  }

  select(r: Room): void {
    this.selectedRoom = r;
  }
}
