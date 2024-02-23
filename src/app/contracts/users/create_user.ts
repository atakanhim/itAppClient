export class Create_User_Request {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export class Create_User_Response {
  succeeded:boolean;
  message:string

}
