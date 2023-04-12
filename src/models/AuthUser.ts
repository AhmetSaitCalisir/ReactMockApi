import IBase from "./Base";

export default interface IAuthUser extends IBase {
  username: string;
  password: string;
}
