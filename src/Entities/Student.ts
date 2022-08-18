import { Person } from './Person';

export class Convener extends Person {
  private studentId: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
  ) {
    super(firstName, lastName, phoneNumber, emailAddress);
  }

  public getStudentId(): string {
    return this.studentId;
  }

  public setStudentId(id: string) {
    this.studentId = id;
  }
}
