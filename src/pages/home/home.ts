import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth.provider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
    this.authProvider.getToken().then(token => { console.log(token) });
  }

}
