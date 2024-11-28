import { Password } from "./password.value-type";
import { UnsecurePassword } from "./unsecure-password.error";

describe("Password", () => {
  it.each(["@Azerty123", "$JohnDoe0"])(
    "should be valid for: %s",
    (stringPassword) => {
      expect(() => new Password(stringPassword)).not.toThrow();
    }
  );

  it.each(["AAzerty123", "Aazerty123", "AzerAtyA123", "AzeratyA123"])(
    "should throw for: %s",
    (stringPassword) => {
      expect(() => new Password(stringPassword)).toThrowError(
        new UnsecurePassword()
      );
    }
  );
});
