import {Component, Input} from '@angular/core';
import {TasksPage} from "../../pages/tasks/tasks";
import {HomePage} from "../../pages/home/home";
import {ProfilePage} from "../../pages/profile/profile";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  public tab1 = TasksPage;
  public tab2 = HomePage;
  public tab3 = ProfilePage;

  constructor() {
  }

}
