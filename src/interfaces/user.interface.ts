import {DefaultInterface} from "./default.interface";
import {User} from "../models/user";

export interface UserInterface extends DefaultInterface {
  user: User;
}
