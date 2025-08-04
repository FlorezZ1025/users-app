import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from '../store/auth/auth.actions';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client = inject(HttpClient);
  private store = inject(Store<{ auth: any }>);

  private url: string = `${environment.API_URL}`;
  // private _token: string | undefined;
  private _user: any;

  constructor() {
    this.store.select('auth').subscribe((state) => {
      console.log('AuthService state:', state);
      this._user = state;
    });
  }

  loginUser({ username, password }: any): Observable<any> {
    console.log('AuthService loginUser:', { username, password });
    return this.client.post<any>(`${this.url}/login`, { username, password });
  }

  set user(user: any) {
    // this._user = user;
    
    sessionStorage.setItem('login', JSON.stringify(user));
  }
  get user() {
    // if (this._user.isAuth) {
    //   return this._user;
    // } else if (sessionStorage.getItem('login')) {
    //   this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
    //   return this._user;
    // }
    return this._user;
  }
  set token(token: string) {
    // this._token = token;
    sessionStorage.setItem('token', token);
  }
  get token(): string {
    return sessionStorage.getItem('token')!;
  }

  getPayload(token: string) {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  isAuthenticated(): boolean {
    return this.user.isAuth;
  }
  logout(): void {
    // this._user = {
    //   user: undefined,
    //   isAuth: false,
    //   isAdmin: false,
    // };
    // this._token = undefined;
    this.store.dispatch(logout());
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
}
