import { createAction, props } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';

export const load = createAction('load', props<{ page: number }>());
export const setUserForm = createAction('setUserForm', props<{ user: User }>());
export const resetUser = createAction('resetUser');
export const findAll = createAction('findAll', props<{ users: User[] }>());
export const findAllPageable = createAction(
  'findAllPageable',
  props<{ users: User[]; paginator: any }>()
);
export const setPaginator = createAction(
  'setPaginator',
  props<{ paginator: any }>()
);
export const findById = createAction('findById', props<{ id: number }>());

export const add = createAction('add', props<{ newUser: User }>());
export const addSuccess = createAction(
  'addSuccess',
  props<{ newUser: User }>()
);
export const update = createAction('update', props<{ updatedUser: User }>());
export const updateSuccess = createAction('updateSuccess', props<{ updatedUser: User }>());
export const remove = createAction('remove', props<{ id: number }>());
export const removeSuccess = createAction('removeSuccess', props<{ id: number }>());

export const setErrors = createAction('setErrors', props<{userForm: User, errors: any }>());
