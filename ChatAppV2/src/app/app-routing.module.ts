import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationV2Component } from './conversation -v2/conversation-v2.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent, pathMatch: 'full' },
  { path: 'rooms/:id/conversation', component: ConversationComponent, pathMatch: 'full' },
  { path: 'rooms/:id/conversation-v2', component: ConversationV2Component, pathMatch: 'full' },
  { path: 'users', component: UserSearchComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
