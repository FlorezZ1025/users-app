import { Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users/page/0',
    },
    {
        path:'users',
        component: UsersTableComponent,
    },
    {
        path:'users/page/:page',
        component: UsersTableComponent,
    },
    {
        path:'users/create',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path:'users/edit/:id',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path:'login',
        component: LoginComponent,
    },
    {
        path:'forbidden',
        component: Forbidden403Component
    }
];
