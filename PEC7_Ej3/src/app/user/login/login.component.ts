import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() private loginNew: EventEmitter<void> = new EventEmitter();
  public user: FormGroup;

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

  loginUser() {
    if (this.user.valid) {
      const user = {
        username: this.user.value.username,
        password: this.user.value.password,
      };

      this.userService.login(user).subscribe(
        (msg) => {
          console.log(msg);
          this.loginNew.next();
        },
        (err) => console.error(err)
      );
    } else {
      console.log('Invalid form data');
    }
  }
}
