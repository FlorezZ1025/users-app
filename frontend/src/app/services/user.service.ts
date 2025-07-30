import { inject, Injectable } from '@angular/core';
import { User } from '../core/interfaces/user.interface';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private client = inject(HttpClient);

  private users: User[] = [];
  private url: string = 'http://localhost:8080/api/users';
  constructor() {}

  getAllUsers(): Observable<User[]> {
    return this.client.get<User[]>(this.url);
  }

  getAllPageable(page: number): Observable<any> {
    return this.client.get<any>(`${this.url}/page/${page}`);
  }

  findUserById(id: number): Observable<User> {
    return this.client.get<User>(`${this.url}/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.client.post<User>(this.url, user);
  }
  updateUser(user: User): Observable<User> {
    return this.client
      .put<User>(`${this.url}/${user.id}`, user)
      .pipe(
        tap((updatedUser: User) => {
        console.log('User updated:', updatedUser);
      }),
      catchError((error) => {
        console.error('Error updating user:', error);
        throw error; // Rethrow the error to propagate it
      })
      );
  }
  deleteUser(id: number): Observable<number> {
    return this.client.delete<number>(`${this.url}/${id}`);
  }
}
