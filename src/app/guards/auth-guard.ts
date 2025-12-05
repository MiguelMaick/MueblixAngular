import { CanActivateFn } from '@angular/router';
import { AuthStateService } from '../Services/auth-state';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  return authState.userData$.pipe(
    map(user => {
      if (user) {
        return true; 
      } else {
        router.navigate(['/auth/login']); 
        return false;
      }
    })
  );
};
