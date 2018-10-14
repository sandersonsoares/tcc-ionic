import {Injectable} from '@angular/core';

@Injectable()
export class DefaultProvider {

  protected URL: string = 'https://todo-task-api.herokuapp.com/api';

  constructor() {
  }

}
