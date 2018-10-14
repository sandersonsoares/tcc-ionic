import {DefaultInterface} from "./default.interface";
import {Task} from "../models/task";

export interface TasksInterface extends DefaultInterface {
  tasks: Task[];
}
