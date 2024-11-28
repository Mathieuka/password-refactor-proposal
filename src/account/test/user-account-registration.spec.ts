import { IUserAccountRepository } from "../domain/i-user-account-repository";
import { UserAccountRegistration } from "../domain/user-account-registration";
import { mock, MockProxy } from "jest-mock-extended";
import { UserAccount } from "../domain/user-account";

describe("UserAccountRegistration", () => {
  let userAccountRegistration: UserAccountRegistration;
  let mockUserAccountRepository: MockProxy<IUserAccountRepository>;

  beforeEach(() => {
    mockUserAccountRepository = mock<IUserAccountRepository>();
    userAccountRegistration = new UserAccountRegistration(
      mockUserAccountRepository
    );
  });

  it("should register a user account", async () => {
    const email = "test@example.com";
    const password = "pasword123";

    await userAccountRegistration.register(email, password);

    expect(mockUserAccountRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email,
        password,
        id: expect.any(String),
      })
    );
  });

  it("should change a user account password", async () => {
    const newPassword = "newPasword123";
    const email = "test@gmail.com";
    const mockUserAccount = new UserAccount(email, "pasword123");
    mockUserAccountRepository.get.mockResolvedValue(mockUserAccount);

    await userAccountRegistration.changePassword(
      mockUserAccount.id,
      newPassword
    );

    expect(mockUserAccountRepository.get).toHaveBeenCalledWith(
      mockUserAccount.id
    );
    expect(mockUserAccountRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email,
        password: newPassword,
        id: mockUserAccount.id,
      })
    );
  });
});
