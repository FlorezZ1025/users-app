import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/users.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'users-table',
  standalone: true,
  imports: [PaginatorComponent, RouterLink],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  private userService = inject(UserService);
  private sharingDataService = inject(SharingDataService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store<{ users: any }>);

  users: User[] = [];
  paginator: any = {};
  pageUrl: string = '/users/page';

  constructor() {
    this.store.select('users').subscribe((state) => {
      this.users = state.users;
      this.paginator = state.paginator;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const page = Number(params.get('page') || '0');
      this.store.dispatch(load({ page }));
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.users = this.users.filter((user) => user.id !== id);
        this.store.dispatch(remove({ id }));
      }
    });
  }
  onSelectUser(id: number): void {
    this.router.navigate([`/users/edit/${id}`]);
  }

  get admin(): boolean {
    return this.authService.isAdmin() || false;
  }
}
