import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../shared/entities';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Success': props<{ user: User }>(),
    'Logout': emptyProps(),
    'Hydrate From Storage': props<{ user: User | null }>(),
  },
});
