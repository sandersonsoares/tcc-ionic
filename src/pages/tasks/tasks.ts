import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TaskProvider} from "../../providers/task.provider";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultPage} from "../default-page";
import {AuthProvider} from "../../providers/auth.provider";
import {Task} from "../../models/task";


@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage extends DefaultPage {

  public tasks: Task[] = [];
  private task: Task;

  constructor(public navCtrl: NavController, public navParams: NavParams, private taskProvider: TaskProvider,
              private loadingController: LoadingController, private authProvider: AuthProvider, private toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    this.loadTasks();
  }

  public loadTasks(refresher = null) {

    this.authProvider.getToken().then(token => {
      this.taskProvider.list(token).subscribe(resp => {
          if (refresher) {
            refresher.complete();
          }

          if (resp.code === '000') {
            this.tasks = resp.tasks;
          } else {
            this.toastCtrl.create({message: resp.message, duration: 3000}).present();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastCtrl.create({message: err.statusText, duration: 3000}).present();
        });
    })
  }

  public addTask() {
    this.task = new Task();
    this.task.updated_at = new Date();
    this.tasks.push(this.task);
  }

  private saveTask() {
    this.authProvider.getToken().then(token => {
      this.taskProvider.create(this.task, token).subscribe(resp => {
          if (resp.code === '000') {
            this.loadTasks();
          } else {
            this.toastCtrl.create({message: resp.message, duration: 3000}).present();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastCtrl.create({message: err.statusText, duration: 3000}).present();
        });
    })
  }

  private updateTask() {

    this.authProvider.getToken().then(token => {
      this.taskProvider.update(this.task, token).subscribe(resp => {
          if (resp.code === '000') {
            this.loadTasks();
          } else {
            this.toastCtrl.create({message: resp.message, duration: 3000}).present();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastCtrl.create({message: err.statusText, duration: 3000}).present();
        });
    })
  }

  public updateOrSave(task: Task) {
    this.task = task;
    if (task._id) {
      this.updateTask();
    } else {
      this.saveTask();
    }
  }

  public removeTask(task: Task) {
    this.loading = this.loadingController.create();
    this.loading.present();

    this.authProvider.getToken().then(token => {
      this.taskProvider.delete(task._id, token).subscribe(resp => {
          this.loading.dismiss();
          if (resp.code === '000') {
            this.loadTasks();
          } else {
            this.toastCtrl.create({message: resp.message, duration: 3000}).present();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastCtrl.create({message: err.statusText, duration: 3000}).present();
          this.loading.dismiss();
        });
    })
  }

}
