import { Password } from "./password.value-type";

export class UserAccount {
  private _password: Password;

  readonly id: string;
  get password(): string {
    return this._password.toString();
  }

  constructor(readonly email: string, password: string) {
    const newPassword: Password = new Password(password)
    newPassword.validate()
    this.id = "123";
    this._password = newPassword;
  }

  public changePassword(newPassword: string): void {
    const newPasswords: Password = new Password(newPassword)
    newPasswords.validate()
    this._password = new Password(newPassword);
  }
}
