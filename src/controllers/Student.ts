import axios from 'axios';

export enum Role {
  Convener,
  Student,
  Ta,
}

interface IBase {
  email: string;
  password: string;
  name: string;
  role: Role;
}

interface ICreateStudent extends IBase {
  studentId: string;
}

interface IUpdateStudent extends ICreateStudent, IBase {}

interface IStudentResponse extends ICreateStudent {
  createdAt: Date;
  updatedAt: Date;
  Enquries: any;
}

interface IStudent {
  createStudent: (student: Partial<ICreateStudent>) => Promise<any>;
  updateStudent: (student: Partial<ICreateStudent>) => Promise<any>;
  findOneStudent: (studentId: string) => Promise<any>;
  findAllStudents: () => Promise<any>;
}

export class Student implements IStudent {
  private enqBaseUrl: string;

  constructor() {
    this.enqBaseUrl = `http://127.0.0.1:8000/apis/auth`;
  }

  async createStudent(student: Partial<ICreateStudent>): Promise<any> {
    const createdStudent = await axios.post<Partial<IStudentResponse>>(
      `${this.enqBaseUrl}`,
      {
        student,
      },
    );
    return createdStudent;
  }

  async updateStudent(student: Partial<IUpdateStudent>): Promise<any> {
    const updatedStudent = await axios.put<Partial<IStudentResponse>>(
      `${this.enqBaseUrl}/${student.studentId}`,
      student,
    );
    return updatedStudent;
  }

  async findOneStudent(studentId: string): Promise<any> {
    const student = await axios.get<Partial<IStudentResponse>>(
      `${this.enqBaseUrl}/${studentId}`,
    );
    return student;
  }

  async findAllStudents(): Promise<any> {
    const students = await axios.get<Partial<IStudentResponse[]>>(
      `${this.enqBaseUrl}/`,
    );
    return students;
  }
}
