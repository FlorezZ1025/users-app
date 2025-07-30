import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  add,
  addSuccess,
  findAll,
  findAllPageable,
  load,
  remove,
  removeSuccess,
  setErrors,
  setPaginator,
  update,
  updateSuccess,
} from './users.actions';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private router = inject(Router);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap((action) =>
        this.userService.getAllPageable(action.page).pipe(
          map((pageable) => {
            const users = pageable.content;
            const paginator = pageable;
            // setPaginator({ paginator });
            return findAllPageable({ users, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      exhaustMap(({ newUser }) =>
        this.userService.createUser(newUser).pipe(
          map((newUser) => addSuccess({ newUser })),
          catchError((error) => {
            if (error.status === 400) {
              of(setErrors({ userForm: newUser, errors: error.error }));
            }
            return of(error);
          })
        )
      )
    )
  );

  addSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSuccess),
        tap(() => {
          this.router.navigate([`/users`]);
          Swal.fire({
            title: 'Good job!',
            text: 'You clicked the button!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      exhaustMap((action) =>
        this.userService.updateUser(action.updatedUser).pipe(
          map((updatedUser) => updateSuccess({ updatedUser })),
          catchError((error) => {
            if (error.status === 400) {
              return of(
                setErrors({ userForm: action.updatedUser, errors: error.error })
              );
            }
            return of(error);
          })
        )
      )
    )
  );
  updateSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSuccess),
        tap(() => {
          this.router.navigate([`/users`]);
          Swal.fire({
            title: 'Good job!',
            text: 'You updated the user!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );
  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      exhaustMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map((id) => removeSuccess({ id })),
          catchError((error) => {
            // if (error.status === 400) {
            //   return of(setErrors({ errors: error.error }));
            // }
            return of(error);
          })
        )
      )
    )
  );
  removeSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeSuccess),
        tap(() => {
          this.router.navigate([`/users`]);
          Swal.fire({
            title: 'Deleted!',
            text: 'User deleted successfully.',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );
}
