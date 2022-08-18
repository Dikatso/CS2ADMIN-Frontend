import axios from 'axios';
import { Role } from './Student';

interface IBase {
  email: string;
  password: string;
  name: string;
  role: Role;
}

interface ICreateTA extends IBase {
  taId: string;
}

interface IUpdateTA extends ICreateTA, IBase {}

interface ITAResponse extends ICreateTA {
  createdAt: Date;
  updatedAt: Date;
  Enquries: any;
}

interface ITA {
  createTA: (TA: Partial<ICreateTA>) => Promise<any>;
  updateTA: (TA: Partial<ICreateTA>) => Promise<any>;
  findOneTA: (taId: string) => Promise<any>;
  findAllTAs: () => Promise<any>;
}

export class TA implements ITA {
  private enqBaseUrl: string;

  constructor() {
    this.enqBaseUrl = `http://127.0.0.1:8000/apis/auth`;
  }

  async createTA(TA: Partial<ICreateTA>): Promise<any> {
    const createdTA = await axios.post<Partial<ITAResponse>>(
      `${this.enqBaseUrl}`,
      {
        TA,
      },
    );
    return createdTA;
  }

  async updateTA(TA: Partial<IUpdateTA>): Promise<any> {
    const updatedTA = await axios.put<Partial<ITAResponse>>(
      `${this.enqBaseUrl}/${TA.taId}`,
      TA,
    );
    return updatedTA;
  }

  async findOneTA(taId: string): Promise<any> {
    const TA = await axios.get<Partial<ITAResponse>>(
      `${this.enqBaseUrl}/${taId}`,
    );
    return TA;
  }

  async findAllTAs(): Promise<any> {
    const TAs = await axios.get<Partial<ITAResponse[]>>(`${this.enqBaseUrl}/`);
    return TAs;
  }
}
