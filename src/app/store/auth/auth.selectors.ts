import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuth, s => s.user);
export const selectIsLoggedIn = createSelector(selectUser, u => !!u);
export const selectIsAdmin = createSelector(selectUser, u => u?.role === 'admin');
