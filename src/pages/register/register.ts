import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../models/user";
import {AuthProvider} from "../../providers/auth.provider";
import {DefaultPage} from "../default-page";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends DefaultPage {

  public user: User = new User();
  private alertRegistro = this.alertCtrl.create({
    title: 'Sucesso!',
    subTitle: 'Registro feito com Sucesso!',
    buttons: ['OK']
  });


  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider,
              public alertCtrl: AlertController, private toastCtrl: ToastController, private loadingController: LoadingController) {
    super();
    this.loading = this.loadingController.create();
  }

  public register() {
    this.loading.present();
    this.authService.register(this.user).subscribe(resp => {
        if (resp.code === '000') {
          this.alertRegistro.present();
          this.navCtrl.getPrevious();
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

}
