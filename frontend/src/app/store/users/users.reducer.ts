import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';
import {
  addSuccess,
  findAll,
  findAllPageable,
  findById,
  load,
  removeSuccess,
  resetUser,
  setErrors,
  setPaginator,
  setUserForm,
  updateSuccess,
} from './users.actions';

const users: User[] = [];
const user: User = {
  id: 0,
  name: '',
  email: '',
  lastname: '',
  username: '',
  password: '',
};
export const usersReducer = createReducer(
  {
    users,
    paginator: {},
    user,
    errors: {},
  },
  on(load, (state, { page }) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(resetUser, (state) => ({
    users: state.users,
    paginator: state.paginator,
    user: { ...user },
    errors: {},
  })),
  //   on(setUserForm, (state, {user})=>({
  //     users: state.users,
  //     paginator: state.paginator,
  //     user: { ...user },
  //     errors: state.errors,
  // })),
  on(findAll, (state, { users }) => ({
    users: [...users],
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(findAllPageable, (state, { users, paginator }) => ({
    users: [...users],
    paginator: { ...paginator },
    user: state.user,
    errors: state.errors,
  })),
  on(findById, (state, { id }) => ({
    users: state.users,
    paginator: state.paginator,
    user: state.users.find((user) => user.id === id) ?? state.user,
    errors: state.errors,
  })),
  on(setPaginator, (state, { paginator }) => ({
    users: state.users,
    paginator: { ...paginator },
    user: state.user,
    errors: state.errors,
  })),
  on(addSuccess, (state, { newUser }) => ({
    users: [...state.users, newUser],
    paginator: state.paginator,
    user: { ...user },
    errors: {},
  })),
  on(updateSuccess, (state, { updatedUser }) => ({
    users: state.users.map((user) =>
      user.id === updatedUser.id ? { ...updatedUser } : user
    ),
    paginator: state.paginator,
    user: { ...user },
    errors: {},
  })),
  on(removeSuccess, (state, { id }) => ({
    users: state.users.filter((user) => user.id !== id),
    paginator: state.paginator,
    user: state.user,
    errors: state.errors,
  })),
  on(setErrors, (state, { userForm, errors }) => ({
    users: state.users,
    paginator: state.paginator,
    user: userForm,
    errors: { ...errors },
  }))
);
