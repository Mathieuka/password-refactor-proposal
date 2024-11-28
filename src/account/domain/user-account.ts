import { Password } from "./password.value-type";

export class UserAccount {
  private _password: Password;

  readonly id: string;
  get password(): string {
    return this._password.toString();
  }

  constructor(readonly email: string, password: string) {
    this.id = "123";
    this._password = new Password(password);
  }

  public changePassword(newPassword: string): void {
    this._password = new Password(newPassword);
  }
}
