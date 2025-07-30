import { Component, inject } from '@angular/core';
import { User } from '../../../core/interfaces/user.interface';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store<{ auth: any }>);

  user: User = {
    id: 0,
    name: '',
    username: '',
    password: '',
    email: '',
    lastname: '',
  };

  constructor() {}
  ngOnInit() {
    this.onDeleteUser();
    this.handlerLoginEvent();
  }
  onSubmit(): void {
    if (!this.user.username && !this.user.password) {
      Swal.fire({
        title: 'Error',
        text: 'Username and password are required',
        icon: 'error',
      });
    } else {
      console.log('LoginComponent user:', this.user);
      this.store.dispatch(
        login({ username: this.user.username, password: this.user.password })
      );
    }
  }

  onDeleteUser() {}
  handlerLoginEvent(): void {}
}
