import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly BASE_URL = 'http://127.0.0.1:8080/users'; // The base URL for the RESTful API

  constructor(private http: HttpClient) { }

  /**
   * Method to retrieve all users.
   * @returns An Observable of user objects.
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL);
  }

  /**
   * Method to retrieve a user by their username.
   * @param username The username of the user to search for.
   * @returns An Observable of a user object.
   */
  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + '/' + username);
  }

  /**
   * Method to create a new user.
   * @param user The user object to be created.
   * @returns An Observable of a user object.
   */
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.BASE_URL, user);
  }

  /**
   * Method to update an existing user.
   * @param userId The ID of the user to be updated.
   * @param user The updated user object.
   * @returns An Observable of a user object.
   */
  public updateUser(userId: any, user: User): Observable<User> {
    return this.http.put<User>(this.BASE_URL + '/' + userId, user);
  }

  /**
   * Method to delete an existing user.
   * @param userId The ID of the user to be deleted.
   * @returns An Observable of a user object.
   */
  public deleteUser(userId: any): Observable<User> {
    return this.http.delete<User>(this.BASE_URL + '/' + userId);
  }
}
