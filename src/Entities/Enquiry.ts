export enum EnquiryType {
  AssignmentExtension,
  TestConcessions,
  GeneralAdminQuery,
}

export enum Status {
  Recieved,
  Reviewed,
  Rejected,
  Accepted,
}

export class Enquiry {
  private id: string;
  private type: EnquiryType;
  private title: string;
  private description: string;
  private createdDate: Date;
  private updatedDate: Date;
  private status: Status;

  constructor(
    type: EnquiryType,
    title: string,
    description: string,
    createdDate: Date,
    updatedDate: Date,
    status: Status,
  ) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.status = status;
  }

  public gettype(): EnquiryType {
    return this.type;
  }

  public gettitle(): string {
    return this.title;
  }

  public getdescription(): string {
    return this.description;
  }

  public getcreatedDate(): Date {
    return this.createdDate;
  }

  public getupdatedDate(): Date {
    return this.updatedDate;
  }

  public getstatus(): Status {
    return this.status;
  }

  public settype(type: EnquiryType): void {
    this.type = type;
  }

  public settitle(title: string): void {
    this.title = title;
  }

  public setdescription(description: string): void {
    this.description = description;
  }

  public setcreatedDate(createdDate: Date): void {
    this.createdDate = createdDate;
  }

  public setupdatedDate(updatedDate: Date): void {
    this.updatedDate = updatedDate;
  }

  public setstatus(status: Status): void {
    this.status = status;
  }
}
