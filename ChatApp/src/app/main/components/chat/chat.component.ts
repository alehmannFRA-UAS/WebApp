import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/model/message';
import { ChatRoomService } from 'src/app/shared/services/chat-room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public title: string = '';
  public username: string = '';
  public messages: Message[] = [];
  public newMessage: string = '';

  constructor(private route: ActivatedRoute,
    private chatService: ChatRoomService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      const user = params['user'];
      if (name) {
        // You can now use the 'name' variable in your component logic
        console.log('Name from URL:', name);
        this.title = name;
      }
      if (user) {
        // You can now use the 'user' variable in your component logic
        console.log('user from URL:', user);
        this.username = user;
      }
      this.messages = this.chatService.getMessagesByRoom(name);

    });
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.title, this.username, this.newMessage);
    this.newMessage = '';
    this.messages = this.chatService.getMessagesByRoom(this.title);
  }
}
