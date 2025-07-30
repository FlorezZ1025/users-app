import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../core/interfaces/user.interface';
import { input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { add, findById, resetUser, setUserForm, update } from '../../store/users/users.actions';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private sharingDataService = inject(SharingDataService);
  private store = inject(Store<{ users: any }>);
  // @Input() user!: User;
  // @Input() selectedUser: User | undefined;
  // @Output() newUserEmmiter = new EventEmitter<User>();

  errors: any = {};

  user: User = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  };
  constructor() {
    this.store.select('users').subscribe((state) => {
      this.errors = state.errors;
      this.user = { ...state.user };
    });
  }
  ngOnInit(): void {
    this.store.dispatch(resetUser())
    const id = this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id') || '0');
      if (id > 0) {
        this.store.dispatch(findById({ id }));
      }
    });
  }
  onSubmit(userForm: NgForm) {
    // this.store.dispatch(setUserForm({user: this.user}));
    if (this.user.id > 0) {
      this.store.dispatch(update({ updatedUser: this.user }));
    } else {
      this.store.dispatch(add({ newUser: this.user }));
    }
    // this.store.dispatch(resetUser())
    // userForm.resetForm();
    // userForm.onReset();
  }

  onReset(userForm: NgForm) {
    this.store.dispatch(resetUser());
    userForm.resetForm();
    userForm.onReset();
  }
}
