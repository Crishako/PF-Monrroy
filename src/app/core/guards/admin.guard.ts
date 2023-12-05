import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAuthUser } from 'src/app/auth/store/auth.selector';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectAuthUser).pipe(
    map((user) => {
      if (user?.role !== 'ADMIN') {
        return router.createUrlTree(['/dashboard/home']);
      }else{
        return true;
      }
    })
  )
};
