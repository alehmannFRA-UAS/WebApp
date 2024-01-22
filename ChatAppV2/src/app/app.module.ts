import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FormsModule } from '@angular/forms';
import { RoomCardComponent } from './room-card/room-card.component';
import { HomeComponent } from './home/home.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationV2Component } from './conversation -v2/conversation-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RoomsComponent,
    RoomCardComponent,
    HomeComponent,
    UserSearchComponent,
    AboutComponent,
    NotFoundComponent,
    ConversationComponent,
    ConversationV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Diesen Eintrag hinzufügen:
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
