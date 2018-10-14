import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {User} from "../../models/user";
import {AuthProvider} from "../../providers/auth.provider";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultPage} from "../default-page";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends DefaultPage {

  public user: User = new User();

  constructor(public navCtrl: NavController, private authProvider: AuthProvider,
              private toastCtrl: ToastController, private loadingController: LoadingController) {
    super();
    this.loading = this.loadingController.create();

    this.authProvider.getToken().then(token => {
      if (token) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  public login() {
    this.loading.present();

    this.authProvider.authetication(this.user).subscribe(resp => {
        if (resp.code === '000') {
          this.authProvider.saveToken(resp.token);
          this.navCtrl.setRoot(HomePage);
        } else {
          this.toastCtrl.create({message: resp.message}).present();
        }
        this.loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        this.toastCtrl.create({message: err.statusText}).present();
        this.loading.dismiss();
      });
  }

  public register() {
    this.navCtrl.push(RegisterPage);
  }

}
