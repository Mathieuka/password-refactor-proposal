import { UnsecurePassword } from "./unsecure-password.error";

export class Password {
  private readonly stringPassword: string;
  private readonly upperCasedPasswordString: string[];

  constructor(stringPassword: string) {
    this.stringPassword = stringPassword.trim();
    this.upperCasedPasswordString = Array.from(
      this.stringPassword.toUpperCase()
    );

    this.validate();
  }

  toString(): string {
    return this.stringPassword;
  }

  private validate(): asserts this is { toString(): string } {
    if (
      this.isEmpty() ||
      this.hasThriceTheSameCharacter() ||
      this.hasTwiceTheSameCharacterInARow()
    ) {
      throw new UnsecurePassword();
    }
  }

  private isEmpty(): boolean {
    return this.stringPassword.length === 0;
  }

  private hasThriceTheSameCharacter(): boolean {
    return this.upperCasedPasswordString.some(
      (char) =>
        this.upperCasedPasswordString.filter((c) => c === char).length >= 3
    );
  }

  private hasTwiceTheSameCharacterInARow(): boolean {
    return this.upperCasedPasswordString
      .slice(0, -1)
      .some((char, i) => char === this.upperCasedPasswordString[i + 1]);
  }
}
