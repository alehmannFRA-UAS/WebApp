import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';
import { ApiRoomComponent } from './components/api/room/api-room.component';
import { ApiChatComponent } from './components/api/chat/api-chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomComponent, pathMatch: 'full' },
  { path: 'rooms/:id', component: ChatComponent, pathMatch: 'full' },
  { path: 'api/rooms', component: ApiRoomComponent, pathMatch: 'full' },
  { path: 'api/rooms/:id', component: ApiChatComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
