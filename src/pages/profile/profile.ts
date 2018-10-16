import {Component} from '@angular/core';
import {App, LoadingController, MenuController, ToastController} from 'ionic-angular';
import {User} from "../../models/user";
import {UserProvider} from "../../providers/user.provider";
import {DefaultPage} from "../default-page";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthProvider} from "../../providers/auth.provider";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage extends DefaultPage {

  public user: User = new User();

  constructor(private userProvider: UserProvider, private toastCtrl: ToastController,
              private loadingController: LoadingController, private authProvider: AuthProvider,
              public menuCtrl: MenuController, private app: App) {
    super();
  }

  ionViewDidLoad() {
    this.loadUser();
  }

  private loadUser() {
    this.loading = this.loadingController.create();
    this.loading.present();

    this.authProvider.getToken().then(token => {
      this.userProvider.info(token).subscribe(resp => {
          if (resp.code === '000') {
            this.user = resp.user;
          } else {
            this.toastCtrl.create({message: resp.message, duration: 3000}).present();
          }
          this.loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          this.toastCtrl.create({message: err.statusText, duration: 3000}).present();
          this.loading.dismiss();
        });
    })
  }

  public save() {
    this.loading = this.loadingController.create();
    this.loading.present();

    this.authProvider.getToken().then(token => {
      this.userProvider.update(this.user, token).subscribe(resp => {
          this.loading.dismiss();
          if (resp.code === '000') {
            this.loadUser();
          }
          this.toastCtrl.create({message: resp.message, duration: 3000}).present();
        },
        (err: HttpErrorResponse) => {
          this.toastCtrl.create({message: err.statusText, duration: 3000}).present();
          this.loading.dismiss();
        });
    })
  }

  public logout() {
    this.authProvider.removeToken();
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

}
