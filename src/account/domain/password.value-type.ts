import { UnsecurePassword } from "./unsecure-password.error";

export class Password {
  private readonly stringPassword: string;
  private cachedUpperCasedPasswordString: string[] | null = null;

  /*
  DISCLAIMER: is an opinionated point.
  I prefer not to perform computations in the constructor. Although this
  might not seem significant in this particular case, this value object
  could be used in various validation scenarios in the future. We might not
  want to systematically perform all computations for every instance. What I
  mean is that if we need to evolve the business rules for validation, it will
  be simpler to handle this outside of the constructor, in a method. Otherwise,
  we would be forced to either perform unnecessary calculations or manage special
  cases to avoid them inside the constructor.
  */
  constructor(stringPassword: string) {
    this.stringPassword = stringPassword;
  }

  toString(): string {
    return this.stringPassword.trim();
  }

  validate(): asserts this is { toString(): string } {
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

  // Cache the result to avoid computing it multiple times
  private upperCasedPasswordString(): string[] {
    if (this.cachedUpperCasedPasswordString === null) {
      this.cachedUpperCasedPasswordString = Array.from(
          this.stringPassword.toUpperCase()
      );
    }
    return this.cachedUpperCasedPasswordString;
  }

  private hasThriceTheSameCharacter(): boolean {
    const stringPasswordUpperCased = this.upperCasedPasswordString();

    return stringPasswordUpperCased.some(
      (char) =>
          stringPasswordUpperCased.filter((c) => c === char).length >= 3
    );
  }

  // Add isConsecutiveDuplicateCharacter to make it more explicit/readable
  private hasTwiceTheSameCharacterInARow(): boolean {
    const stringPasswordUpperCased = this.upperCasedPasswordString()
    const isConsecutiveDuplicateCharacter = (char: string, i: number) => char === stringPasswordUpperCased[i + 1];

    return stringPasswordUpperCased
      .slice(0, -1)
      .some(isConsecutiveDuplicateCharacter);
  }
}
