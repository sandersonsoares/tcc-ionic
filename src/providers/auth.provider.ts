import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DefaultProvider} from './default.provider';
import {User} from "../models/user";
import {AuthInterface} from "../interfaces/auth.interface";
import {DefaultInterface} from "../interfaces/default.interface";
import {Storage} from "@ionic/storage";

@Injectable()
export class AuthProvider extends DefaultProvider {

  TOKEN: string = 'token';

  constructor(private http: HttpClient, private storage: Storage) {
    super();
  }

  /**
   Faz o login da aplicação com a obtenção do token
   */
  public authetication(user: User) {
    return this.http.post<AuthInterface>(this.URL + '/auth', user);
  }

  public register(user: User) {
    return this.http.post<DefaultInterface>(this.URL + '/public/register', user);
  }

  public saveToken(token: string) {
    this.storage.set(this.TOKEN, token);
  }

  public getToken() {
    return this.storage.get(this.TOKEN).then(resp => {
      return Promise.resolve(resp)
    });
  }

  public removeToken() {
    this.storage.remove(this.TOKEN);
  }

}
