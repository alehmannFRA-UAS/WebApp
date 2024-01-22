import { Component, numberAttribute } from '@angular/core';
import { Message } from '../message';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-conversation-v2',
  templateUrl: './conversation-v2.component.html',
  styleUrls: ['./conversation-v2.component.css']
})
export class ConversationV2Component {

  public title: string = '';
  public roomId: string = '';
  public userId!: number;
  public username: string = '';
  public messages: Message[] = [];
  public newMessage: string = '';
  getMessagesInterval: any;

  constructor(private route: ActivatedRoute,
    private roomService: RoomService) {
    console.log('ConversationComponent');

    this.route.params.subscribe(params => {
      const roomId = params['id'];
      if (roomId) {
        // You can now use the 'roomId' variable in your component logic
        console.log('roomId from URL:', roomId);
        this.roomId = roomId;
      }
      this.route.queryParams.subscribe(queryParam => {
        const userId = queryParam['userId'];
        if (userId) {
          // You can now use the 'user' variable in your component logic
          console.log('userId from URL:', userId);
          this.userId = userId;
        }
      })

      if (this.userId && this.roomId) {
        this.getMessagesInterval = setInterval(()=>{
          this.roomService.getRoomByIdAndUserId(this.roomId, this.userId).subscribe({
            next: (res: any) => {
              this.title = res.name;
              this.messages = [];
              Object.keys(res.messages).forEach((key, index) => {
                this.messages.push(res.messages[key]);
                console.log(this.messages[index].userId);
              });
              this.clearActiveInterval();
            },
            error: (err: any) => {console.log(err);
            clearInterval(this.getMessagesInterval())}
          });
        }, 1000)
      }
    });
  }

  clearActiveInterval() {
    if(!document.location.href.includes('/converstaion-v2')){
      clearInterval(this.getMessagesInterval);
    }
  }
  public sendMessage(): void {
    const message: Message = {
      id: -1,
      content: this.newMessage,
      userId: this.userId,
      timestamp: new Date()
    }

    // this.messages.push(message);
    this.roomService.sendMessage(this.userId, this.roomId, message.content).subscribe({
      next: (res: Message) => {
        this.messages.push(res);
        this.newMessage = '';
      },
      error: (err: any) => console.log(err)
    });
  }
}
