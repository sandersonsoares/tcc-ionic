import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DefaultProvider} from './default.provider';
import {DefaultInterface} from "../interfaces/default.interface";
import {UserInterface} from "../interfaces/user.interface";
import {User} from "../models/user";

@Injectable()
export class UserProvider extends DefaultProvider {

  token: string = null;

  constructor(private http: HttpClient, private storage: Storage) {
    super();

    storage.get('token').then((val) => {
      this.token = val;
    });
  }

  /**
   Lista as informações do usário logado.
   */
  public info() {
    return this.http.get<UserInterface>(this.URL + '/user'), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Deleta a conta do usuário
   */
  public delete() {
    return this.http.delete<DefaultInterface>(this.URL + '/user/'), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Edita uma task
   */
  public update(user: User) {
    return this.http.put<DefaultInterface>(this.URL + '/user', user), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

}
