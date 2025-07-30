import { Component, inject, OnInit } from '@angular/core';
import { User } from '../core/interfaces/user.interface';
import { UserService } from '../services/user.service';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { add, findAll, remove, setPaginator, update } from '../store/users/users.actions';
import { login } from '../store/auth/auth.actions';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent {
  private sharingDataService = inject(SharingDataService);
  private authService = inject(AuthService);
  private router = inject(Router);


}
