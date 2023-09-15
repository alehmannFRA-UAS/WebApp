import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
