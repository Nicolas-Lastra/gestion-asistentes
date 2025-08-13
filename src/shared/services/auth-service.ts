import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, BehaviorSubject } from 'rxjs';
import { Credentials, User } from '../entities';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = 'http://localhost:3000/users';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasStoredUser());
  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  private currentUser: User | null = this.getCurrentUser();

  constructor(private http: HttpClient) { }

  private hasStoredUser(): boolean {
    return localStorage.getItem('user') !== null;
  }

  login(creds: Credentials) {
    // json-server: GET con query (nota: en producción sería POST y NUNCA en query)
    return this.http
      .get<User[]>(`${this.baseUrl}?name=${creds.name}&password=${creds.password}`)
      .pipe(
        map(users => {
          const user = users[0];
          if (user) {
            this.currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
            this._isLoggedIn$.next(true);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this._isLoggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
