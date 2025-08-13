import { CanActivateFn } from '@angular/router';

export const isAdminGuard: CanActivateFn = (route, state) => {

  // if (this.user.role === 'admin') {
  //   return true;
  // }

  // this.router.navigate(['/not-authorized']);
  return false;
};
