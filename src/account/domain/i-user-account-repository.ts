import { UserAccount } from "./user-account";

export interface IUserAccountRepository {
  save(userAccount: UserAccount): Promise<void>;
  get(userId: string): Promise<UserAccount>;
}
