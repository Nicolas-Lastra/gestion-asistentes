import { Injectable } from '@angular/core';
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { Credentials, User } from '../entities';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../app/store/auth/auth.actions';
import { selectIsAdmin, selectIsLoggedIn, selectUser } from '../../app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private users: User[] = [
    { name: 'user', password: 'user', role: 'user' },
    { name: 'admin', password: 'admin', role: 'admin' }
  ];
  
  readonly user$!: Observable<User | null>;
  readonly isLoggedIn$!: Observable<boolean>;
  readonly isAdmin$!: Observable<boolean>;

  private currentUser: User | null = null;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isAdmin$ = this.store.select(selectIsAdmin);

    this.user$.subscribe(u => { this.currentUser = u || null; });

    // Hidratar desde localStorage al iniciar
    const raw = localStorage.getItem('user');
    const stored = raw ? (JSON.parse(raw) as User) : null;
    this.store.dispatch(AuthActions.hydrateFromStorage({ user: stored }));
  }

  login(creds: Credentials): Observable<boolean> {
    const foundUser = this.users.find(
      u => u.name === creds.name && u.password === creds.password
    );

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      this.store.dispatch(AuthActions.loginSuccess({ user: foundUser }));
      return of(true);
    }

    return of(false);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.store.dispatch(AuthActions.logout());
  }

  isLoggedIn(): boolean { return !!this.currentUser; }
  isAdmin(): boolean { return this.currentUser?.role === 'admin'; }
  getCurrentUser(): User | null { return this.currentUser; }
}
