import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { UserStoreService } from './user-store.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  login(user: User): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/api/user/login', user)
      .pipe(
        map((res: any) => {
          this.userStore.token = res.token;
          return res;
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(
      'http://localhost:3000/api/user/register',
      user
    );
  }
}
