import { Person } from './Person';

export class Convener extends Person {
  private convenerId: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
  ) {
    super(firstName, lastName, phoneNumber, emailAddress);
  }

  public getConvenerId(): string {
    return this.convenerId;
  }

  public setConvenerId(id: string) {
    this.convenerId = id;
  }
}
