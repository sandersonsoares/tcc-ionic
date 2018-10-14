import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DefaultProvider} from './default.provider';
import {Task} from "../models/task";
import {DefaultInterface} from "../interfaces/default.interface";
import {TasksInterface} from "../interfaces/tasks.interface";

@Injectable()
export class TaskProvider extends DefaultProvider {

  token: string = null;

  constructor(private http: HttpClient, private storage: Storage) {
    super();

    storage.get('token').then((val) => {
      this.token = val;
    });
  }

  /**
   Cria uma nova task
   */
  public create(task: Task) {
    return this.http.post<DefaultInterface>(this.URL + '/task', task), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Deleta uma task
   */
  public delete(id: string) {
    return this.http.delete<DefaultInterface>(this.URL + '/task/' + id), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Edita uma task
   */
  public update(task: Task) {
    return this.http.put<DefaultInterface>(this.URL + '/task', task), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Lista de taks já foram finalizadas.
   */
  public listFinished() {
    return this.http.get<TasksInterface>(this.URL + '/task/finished'), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Lista de todas as tasks.
   */
  public list() {
    return this.http.get<TasksInterface>(this.URL + '/task'), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

  /**
   Lista de taks que ainda estão por fazer.
   */
  public listToDo() {
    return this.http.get<TasksInterface>(this.URL + '/task/todo'), {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
  }

}
