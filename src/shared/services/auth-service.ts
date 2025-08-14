import { Injectable } from '@angular/core';
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { Credentials, User } from '../entities';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private users: User[] = [
    { name: 'user', password: 'user', role: 'user' },
    { name: 'admin', password: 'admin', role: 'admin' }
  ];

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasStoredUser());
  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _user$ = new BehaviorSubject<User | null>(this.getCurrentUser());
  readonly user$ = this._user$.asObservable();

  readonly isAdmin$ = this.user$.pipe(map(u => u?.role === 'admin'));

  private currentUser: User | null = this.getCurrentUser();

  constructor() { }

  private hasStoredUser(): boolean {
    return localStorage.getItem('user') !== null;
  }

  login(creds: Credentials): Observable<boolean> {
    const foundUser = this.users.find(
      u => u.name === creds.name && u.password === creds.password
    );

    if (foundUser) {
      this.currentUser = foundUser;
      localStorage.setItem('user', JSON.stringify(foundUser));
      this._user$.next(foundUser);
      this._isLoggedIn$.next(true);
      return of(true);
    }

    return of(false);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._user$.next(null);
    this._isLoggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  isAdmin(): boolean {
    return this._user$.value?.role === 'admin';
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
