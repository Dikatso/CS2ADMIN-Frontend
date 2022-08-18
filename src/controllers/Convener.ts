import axios from 'axios';
import { Role } from './Student';

interface IBase {
  email: string;
  password: string;
  name: string;
  role: Role;
}

interface ICreateConvener extends IBase {
  convenerId: string;
}

interface IUpdateConvener extends ICreateConvener, IBase {}

interface IConvenerResponse extends ICreateConvener {
  createdAt: Date;
  updatedAt: Date;
  Enquries: any;
}

interface IConvener {
  createConvener: (Convener: Partial<ICreateConvener>) => Promise<any>;
  updateConvener: (Convener: Partial<ICreateConvener>) => Promise<any>;
  findOneConvener: (convenerId: string) => Promise<any>;
  findAllConveners: () => Promise<any>;
}

export class Convener implements IConvener {
  private enqBaseUrl: string;

  constructor() {
    this.enqBaseUrl = `http://127.0.0.1:8000/apis/auth`;
  }

  async createConvener(Convener: Partial<ICreateConvener>): Promise<any> {
    const createdConvener = await axios.post<Partial<IConvenerResponse>>(
      `${this.enqBaseUrl}`,
      {
        Convener,
      },
    );
    return createdConvener;
  }

  async updateConvener(Convener: Partial<IUpdateConvener>): Promise<any> {
    const updatedConvener = await axios.put<Partial<IConvenerResponse>>(
      `${this.enqBaseUrl}/${Convener.convenerId}`,
      Convener,
    );
    return updatedConvener;
  }

  async findOneConvener(convenerId: string): Promise<any> {
    const Convener = await axios.get<Partial<IConvenerResponse>>(
      `${this.enqBaseUrl}/${convenerId}`,
    );
    return Convener;
  }

  async findAllConveners(): Promise<any> {
    const Conveners = await axios.get<Partial<IConvenerResponse[]>>(
      `${this.enqBaseUrl}/`,
    );
    return Conveners;
  }
}
