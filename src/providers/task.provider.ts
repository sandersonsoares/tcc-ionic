import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DefaultProvider} from './default.provider';
import {Task} from "../models/task";
import {DefaultInterface} from "../interfaces/default.interface";
import {TasksInterface} from "../interfaces/tasks.interface";

@Injectable()
export class TaskProvider extends DefaultProvider {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   Cria uma nova task
   */
  public create(task: Task, token: string) {
    return this.http.post<DefaultInterface>(this.URL + '/task', task, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  /**
   Deleta uma task
   */
  public delete(id: string, token: string) {
    return this.http.delete<DefaultInterface>(this.URL + '/task/' + id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  /**
   Edita uma task
   */
  public update(task: Task, token: string) {
    return this.http.put<DefaultInterface>(this.URL + '/task/' + task._id, task, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  /**
   Lista de taks já foram finalizadas.
   */
  public listFinished(token: string) {
    return this.http.get<TasksInterface>(this.URL + '/task/finished', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  /**
   Lista de todas as tasks.
   */
  public list(token: string) {
    return this.http.get<TasksInterface>(this.URL + '/task', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  /**
   Lista de taks que ainda estão por fazer.
   */
  public listToDo(token: string) {
    return this.http.get<TasksInterface>(this.URL + '/task/todo', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
