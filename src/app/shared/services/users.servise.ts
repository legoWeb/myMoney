import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';


@Injectable()
export class UsersServise extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .map((users: User[]) => users[0] ? users[0] : undefined);
  }
  createNewUsers(user: User): Observable<object> {
     return this.post(`users`, user);
  }
}

