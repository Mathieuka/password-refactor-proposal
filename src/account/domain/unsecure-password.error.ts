export class UnsecurePassword extends Error {
  constructor() {
    super("Unsecured password submitted.");
  }
}
