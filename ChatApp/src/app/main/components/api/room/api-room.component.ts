import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Room } from 'src/app/shared/model/room';
import { ChatRoomApiService } from 'src/app/shared/services/chat-room-api.service';

@Component({
  selector: 'app-room',
  templateUrl: './api-room.component.html',
  styleUrls: ['./api-room.component.css']
})
export class ApiRoomComponent implements OnInit {
  public rooms: Room[] = [];      // Eine Liste der verfügbaren Chat-Räume
  public yourRooms: Room[] = [];  // Eine Liste der Chat-Räume, denen der Benutzer beigetreten ist
  public username: string = '';   // Der Benutzername des aktuellen Benutzers

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceApi: ChatRoomApiService // Hier wird der Service für die Kommunikation mit der API injiziert
  ) { }

  ngOnInit(): void {
    // Diese Methode wird beim Initialisieren des Komponenten aufgerufen

    this.route.queryParams.subscribe(params => {
      const username = params['user'];
      if (username) {
        // Der Benutzername wurde aus den Query-Parametern der URL extrahiert
        console.log('username from URL:', username);
        this.username = username;

        // Lade die verfügbaren Chat-Räume
        this.serviceApi.getChatRooms().subscribe(
          (res: Room[]) => this.rooms = res,
          (err: any) => console.log(err.error)
        );

        // Lade die Chat-Räume denen der Benutzer beigetreten ist
        this.serviceApi.getChatRoomsByUser(this.username).subscribe(
          (res: Room[]) => this.yourRooms = res,
          (err: any) => console.log(err.error)
        );
      }
    });
  }

  /**
   * Methode zum Öffnen eines Chat-Raums
   * @param room 
   */
  public openRoom(room: Room): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { name: room.name, user: this.username } // Füge den Raumnamen und den Benutzernamen als Query-Parameter hinzu
    };

    /**
     * Navigiere zum ausgewählten Raum und übergebe die Query-Parameter
     */
    this.router.navigate(['/rooms', room.id], navigationExtras);
  }

  /**
   * Methode zum Beitreten eines Chat-Raums
   * @param room 
   */
  public joinRoom(room: Room): void {
    // Rufe die Methode zum Beitreten eines Chat-Raums im Service auf
    this.serviceApi.joinChatRoom(room.id, this.username).subscribe(
      (res: any) => console.log(res),
      (err: any) => console.log(err.error)
    );

    // Aktualisiere die Liste der Chat-Räume des Benutzers
    this.serviceApi.getChatRoomsByUser(this.username).subscribe(
      (res: Room[]) => this.yourRooms = res,
      (err: any) => console.log(err.error)
    );
  }

  /**
   * Methode zum Verlassen eines Chat-Raums
   * @param room 
   */
  public leaveRoom(room: Room): void {
    // Rufe die Methode zum Verlassen eines Chat-Raums im Service auf
    this.serviceApi.leaveChatRoom(room.id, this.username).subscribe(
      (res: any) => console.log(res),
      (err: any) => console.log(err.error)
    );

    // Aktualisiere die Liste der Chat-Räume des Benutzers
    this.serviceApi.getChatRoomsByUser(this.username).subscribe(
      (res: Room[]) => this.yourRooms = res,
      (err: any) => console.log(err.error)
    );
  }
}