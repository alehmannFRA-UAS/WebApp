import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './room';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Room> {
    const url = 'http://127.0.0.1:8000/users/1/chatrooms';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<any>(url, { headers });
  }

  public createRoom(name: string): Observable<Room> {
    const url = 'http://127.0.0.1:8000/users/1/chatrooms';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http.post<Room>(url, name, { headers });
  }

  public getRoomByIdAndUserId(roomId: string, userId: number): Observable<Room> {
    const url = `http://127.0.0.1:8000/users/${userId}/chatrooms/${roomId}`;

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<any>(url, { headers });
  }

  public joinRoom(roomId: any, userId: number) {
    const url = `http://127.0.0.1:8000/users/${userId}/chatrooms`;

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http.put<Room>(url, roomId, { headers });
  }

  public sendMessage(userId: number, roomId: string, content: string): Observable<Message> {
    const url = `http://127.0.0.1:8000/users/${userId}/chatrooms/${roomId}/messages`;

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http.post<Message>(url, content, { headers });
  }
}
