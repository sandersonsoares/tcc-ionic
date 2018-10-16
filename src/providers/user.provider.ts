import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DefaultProvider} from './default.provider';
import {UserInterface} from "../interfaces/user.interface";
import {DefaultInterface} from "../interfaces/default.interface";
import {User} from "../models/user";

@Injectable()
export class UserProvider extends DefaultProvider {

  private token: string = 'aslkdjalskjd'

  constructor(private http: HttpClient) {
    super();
  }

  /**
   Lista as informações do usário logado.
   */
  public info(token: string) {
    return this.http.get<UserInterface>(this.URL + '/user', {
      headers: new HttpHeaders().set('Authorization', token)
    });
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
  public update(user: User, token: string) {
    return this.http.put<DefaultInterface>(this.URL + '/user', user, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
