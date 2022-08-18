export class Person {
  private firstName: string;
  private lastName: string;
  private phoneNumber: string;
  private emailAddress: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
  }

  public getfirstName(): string {
    return this.firstName;
  }

  public getlastName(): string {
    return this.lastName;
  }

  public getphoneNumber(): string {
    return this.phoneNumber;
  }

  public getemailAddress(): string {
    return this.emailAddress;
  }

  public setfirstName(firstName: string) {
    this.firstName = firstName;
  }

  public setlastName(lastName: string) {
    this.lastName = lastName;
  }

  public setphoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  public setemailAddress(emailAddress: string) {
    this.emailAddress = emailAddress;
  }
}
