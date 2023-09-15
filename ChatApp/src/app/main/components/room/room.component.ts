import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Room } from 'src/app/shared/model/room';
import { ChatRoomService } from 'src/app/shared/services/chat-room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
  public rooms: Room[] = [];
  public yourRooms: Room[] = [];
  public username: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatRoomService) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const username = params['user'];
      if (username) {
        // You can now use the 'username' variable in your component logic
        console.log('username from URL:', username);
        this.username = username;
        this.rooms = this.chatService.getChatRooms();
        this.yourRooms = this.chatService.getChatRoomsByUser(this.username);
      }
    });
  }
  public openRoom(room: Room): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { name: room.name, user: this.username } // Add the room name as a query parameter
    };

    // Navigate to the room with the query parameter
    this.router.navigate(['/rooms', room.id], navigationExtras);
  }

  public joinRoom(room: Room): void {
    this.chatService.joinChatRoom(room.name, this.username);
    this.yourRooms= this.chatService.getChatRoomsByUser(this.username);
  }

  public leftRoom(room: Room): void {
    this.chatService.leaveChatRoom(room.name, this.username);
    this.yourRooms= this.chatService.getChatRoomsByUser(this.username);
  }
}
