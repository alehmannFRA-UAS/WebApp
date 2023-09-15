import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomComponent, pathMatch: 'full' },
  { path: 'rooms/:id', component: ChatComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
