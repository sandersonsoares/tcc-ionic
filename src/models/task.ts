export class Task {

  _id: string;
  title: string;
  description: string;
  is_finish: boolean;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this._id = null;
    this.title = null;
    this.description = null;
    this.is_finish = false;
    this.created_at = null;
    this.updated_at = null;
  }
}
