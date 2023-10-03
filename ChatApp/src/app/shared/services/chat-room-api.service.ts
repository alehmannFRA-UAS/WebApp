import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../model/room';
import { Message } from '../model/message';

@Injectable({
    providedIn: 'root'
})
export class ChatRoomApiService {
    private readonly BASE_URL = 'http://127.0.0.1:8080/rooms'; // Die Basis-URL für die RESTful API

    constructor(private http: HttpClient) { }

    /**
     * Methode zum Abrufen aller Chat-Räume
     * @returns 
     */
    public getChatRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.BASE_URL);
    }

    /**
     * Methode zum Erstellen eines neuen Chat-Raums
     * @param roomName 
     * @returns 
     */
    public createChatRoom(roomName: string): Observable<Room> {
        const newRoom: Room = {
            id: -1,
            name: roomName,
            users: [],
            messages: [],
        };
        return this.http.post<Room>(this.BASE_URL, newRoom);
    }

    /**
     * Methode zum Beitreten eines Chat-Raums
     * @param roomId 
     * @param username 
     * @returns 
     */
    public joinChatRoom(roomId: number, username: string): Observable<Room> {
        const joinUrl = `${this.BASE_URL}/${roomId}/join?username=${username}`;
        return this.http.post<Room>(joinUrl, {});
    }

    /**
     * Methode zum Verlassen eines Chat-Raums
     * @param roomId 
     * @param username 
     * @returns 
     */
    public leaveChatRoom(roomId: number, username: string): Observable<Room> {
        const leaveUrl = `${this.BASE_URL}/${roomId}/leave?username=${username}`;
        return this.http.post<Room>(leaveUrl, {});
    }

    /**
     * Methode zum Senden einer Nachricht in einen Chat-Raum
     * @param roomId 
     * @param username 
     * @param message 
     * @returns 
     */
    public sendMessage(roomId: number, username: string, message: string): Observable<Message> {
        const messageUrl = `${this.BASE_URL}/${roomId}/message`;
        const newMessage: Message = {
            id: -1,
            content: message,
            username: username,
            timestamp: new Date()
        };
        return this.http.post<Message>(messageUrl, newMessage);
    }

    /**
     * Methode zum Abrufen aller Chat-Räume eines Benutzers
     * @param username 
     * @returns 
     */
    public getChatRoomsByUser(username: string): Observable<Room[]> {
        const userRoomsUrl = `${this.BASE_URL}/user/${username}`;
        return this.http.get<Room[]>(userRoomsUrl);
    }

    /**
     * Methode zum Abrufen aller Nachrichten in einem Chat-Raum
     * @param roomId 
     * @returns 
     */
    public getMessagesByRoom(roomId: number): Observable<Message[]> {
        const messagesUrl = `${this.BASE_URL}/${roomId}/messages`;
        return this.http.get<Message[]>(messagesUrl);
    }
}
