import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../../shared/entities';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (_, { user }) => ({ user })),
  on(AuthActions.logout, _ => ({ user: null })),
  on(AuthActions.hydrateFromStorage, (_, { user }) => ({ user }))
);
