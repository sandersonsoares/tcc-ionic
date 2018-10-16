import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TasksPage} from "../tasks/tasks";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public tab1 = TasksPage;
  public tab2 = HomePage;
  public tab3 = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
