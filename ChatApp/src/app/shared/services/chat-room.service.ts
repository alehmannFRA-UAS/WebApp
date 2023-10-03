import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Room } from '../model/room';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  private chatRooms: Room[] = []; // Änderung: Verwenden Sie ein Array statt einer Map
  private readonly CHAT_ROOMS_KEY = 'chatRooms'; // Schlüssel für den LocalStorage

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    // Versuche, die Chat-Räume aus dem LocalStorage abzurufen
    const storedChatRooms = this.storage.get(this.CHAT_ROOMS_KEY) as Room[];

    if (storedChatRooms) {
      this.chatRooms = storedChatRooms;
    } else {
      // Beispiel: Initialisieren von Chat-Raumdaten
      this.createChatRoom('Allgemeiner Chat');
      this.createChatRoom('Technik-Diskussion');
      this.createChatRoom('Offenes Forum');

      // Add some messages from Alice in the "Allgemeiner Chat" room
      this.sendMessage('Allgemeiner Chat', 'Alice', 'Hallo, Welt!');
      this.sendMessage('Allgemeiner Chat', 'Alice', 'Wie geht es dir?');
      this.sendMessage('Allgemeiner Chat', 'Bob', 'Mir geht gut und dir?');

      // Add some messages from Bob in the "Technik-Diskussion" room
      this.sendMessage('Technik-Diskussion', 'Bob', 'Ich habe ein Problem mit meinem Computer.');
      this.sendMessage('Technik-Diskussion', 'Bob', 'Kann mir jemand helfen?');
      this.sendMessage('Technik-Diskussion', 'Alice', 'Was kann ich für dich tun?');

      // Add some messages from Alice and Bob in the "Offenes Forum" room
      this.sendMessage('Offenes Forum', 'Alice', 'Ich habe ein interessantes Buch gelesen.');
      this.sendMessage('Offenes Forum', 'Bob', 'Welches Buch?');
      this.sendMessage('Offenes Forum', 'Alice', '"Der Name der Rose" von Umberto Eco.');

      this.saveChatRoomsToStorage();
    }
  }

  public getChatRooms(): Room[] {
    return this.chatRooms;
  }

  public createChatRoom(roomName: string): void {
    // Beispiel: Erstellt einen neuen Chat-Raum
    if (!this.chatRooms.find((room) => room.name === roomName)) {
      const newRoom: Room = {
        id: this.generateUniqueId(), // Beispiel: Generierung einer eindeutigen ID
        name: roomName,
        users: [],
        messages: [],
      };
      this.chatRooms.push(newRoom);
    }
  }

  public joinChatRoom(roomName: string, username: string): void {
    // Beispiel: Benutzer tritt einem Chat-Raum bei
    const room = this.chatRooms.find((room) => room.name === roomName);
    if (room) {
      room.users.push(username);
      this.saveChatRoomsToStorage();
    }
  }

  public leaveChatRoom(roomName: string, username: string): void {
    // Beispiel: Benutzer verlässt einen Chat-Raum
    const room = this.chatRooms.find((room) => room.name === roomName);
    if (room) {
      const index = room.users.indexOf(username);
      if (index !== -1) {
        room.users.splice(index, 1);
        this.saveChatRoomsToStorage();
      }
    }
  }

  public sendMessage(roomName: string, username: string, message: string): void {
    // Beispiel: Benutzer sendet eine Nachricht im Chat-Raum
    const room = this.chatRooms.find((room) => room.name === roomName);
    if (room) {
      const newMessage: Message = {
        id: this.generateUniqueId(),
        content: message,
        username: username,
        timestamp: new Date(),
      };
      room.messages.push(newMessage);
      this.saveChatRoomsToStorage();
    }
  }

  public getChatRoomsByUser(username: string): Room[] {
    // Diese Methode gibt alle Chat-Räume zurück, in denen der angegebene Benutzer ist
    return this.chatRooms.filter((room) => room.users.includes(username));
  }

  public getMessagesByRoom(roomName: string) {
    const room = this.chatRooms.find((room) => room.name === roomName);
    return room ? room.messages : [];
  }

  private saveChatRoomsToStorage(): void {
    this.storage.set(this.CHAT_ROOMS_KEY, this.chatRooms);
  }

  private generateUniqueId(): number {
    // Beispiel: Generiert eine eindeutige ID für Chat-Räume
    // In der Praxis sollte dies komplexer sein, z.B. mit einer UUID-Bibliothek
    return Math.floor(Math.random() * 1000000);
  }

}
