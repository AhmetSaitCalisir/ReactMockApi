import IAuthUser from "./AuthUser";

export default interface IRegisterUser extends IAuthUser {
  passwordMatch: string;
}
