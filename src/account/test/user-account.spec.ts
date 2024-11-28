import { UserAccount } from "../domain/user-account";

describe("UserAccount", () => {
  let userAccount: UserAccount;

  beforeEach(() => {
    userAccount = new UserAccount("test@example.com", "oldPasword");
  });

  test("changePassword changes the password", () => {
    userAccount.changePassword("newPasword");

    expect(userAccount.password).toBe("newPasword");
  });
});
