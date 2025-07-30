import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { login, loginError, loginSuccess } from './auth.actions';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((action) =>
        this.authService
          .loginUser({ username: action.username, password: action.password })
          .pipe(
            tap((response) => {console.log('Login response:', response);}),
            map((response) => {
              const token = response.token;
              const payload = this.authService.getPayload(token);

              const loginInfo = {
                user: { username: payload.sub },
                isAuth: true,
                isAdmin: payload.isAdmin,
              }
            console.log('Payload:', payload.sub);
              this.authService.token = token;
              this.authService.user = loginInfo;
              console.log('User after login:', this.authService.user);
              return loginSuccess({ loginInfo: loginInfo });
            }),
            catchError((error) => of(loginError({error: error.error.message})))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        map(() => {
          this.router.navigate(['/users/page/0']);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );
  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginError),
        tap((action) => {
          Swal.fire({
            title: 'Error',
            text: action.error,
            icon: 'error',
          });
          return EMPTY;
        })
      ),
    { dispatch: false }
  );
}
