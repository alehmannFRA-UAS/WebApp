import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ApiRoomComponent } from './components/api/room/api-room.component';
import { ApiChatComponent } from './components/api/chat/api-chat.component';


@NgModule({
  declarations: [
    RoomComponent,
    ChatComponent,
    ApiRoomComponent,
    ApiChatComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
