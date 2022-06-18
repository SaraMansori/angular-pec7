import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() private registerNew: EventEmitter<void> = new EventEmitter();
  public user: FormGroup;
  public msg = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this.user = this.formBuilder.group({
      username: ['', [Validators.required, Validators.min(1)]],
      password: ['', [Validators.required, Validators.min(1)]],
    });
  }

  registerUser() {
    if (this.user.valid) {
      console.log('Form data saved succesfully');

      let user = {
        username: this.user.value.username,
        password: this.user.value.password,
      };

      this.userService.register(user).subscribe(
        ({ msg }) => {
          this.msg = msg;
          this.registerNew.next();
        },
        (err) => console.error(err)
      );
    } else {
      console.log('Invalid Form');
    }
  }
}
