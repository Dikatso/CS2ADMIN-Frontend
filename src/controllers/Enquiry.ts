import axios from 'axios';
import { File } from '@/controllers/File';

export class Base {}

interface enquiry {
  userId: string;
  type: EndingType;
}

interface ICreateEnquiry extends enquiry {
  title: string;
  courseCode: string;
  enquiryMessage: string;
  extensionDuration: string;
  attatchmentLink: string;
  assignmentNo: string;
  testNo: string;
  file: string;
}

interface IUpdateEnquiry extends enquiry {
  enquiryReplyMessage: string;
  extensionDuration: string;
  attatchmentLink: string;
  assignmentNo: string;
  status: string;
  id: string;
}

interface IEnquiryResponse extends enquiry, ICreateEnquiry, IUpdateEnquiry {}

interface IEnquiry {
  createEnquiry: (enquiry: Partial<ICreateEnquiry>) => Promise<any>;
  updateEnquiry: (enquiry: Partial<IUpdateEnquiry>) => Promise<any>;
  findOneEnquiry: (enquiryId: string) => Promise<any>;
  findAllEnquiry: () => Promise<any>;
  findEnquiryByUserId: (userId: string) => Promise<any>;
  deleteEnquiry: (enquiryId: string) => Promise<any>;
}

export class Enquiry extends File implements IEnquiry {
  private enqBaseUrl: string;

  constructor() {
    super();
    this.enqBaseUrl = `http://127.0.0.1:8000/apis/enquiry`;
  }

  async createEnquiry(enquiry: Partial<ICreateEnquiry>): Promise<any> {
    const enq = await axios.post<Partial<IEnquiryResponse>>(
      `${this.enqBaseUrl}`,
      {
        enquiry,
      },
    );

    const uploadedFile = super.createFileEnquiry({
      fileUpload: enquiry.file,
      enquiryId: enq.data.id,
    });

    return { enq, uploadedFile };
  }

  async updateEnquiry(enquiry: Partial<IUpdateEnquiry>): Promise<any> {
    const enq = await axios.put<Partial<IEnquiryResponse>>(
      `${this.enqBaseUrl}/${enquiry.userId}`,
      enquiry,
    );
    return enq;
  }

  async findOneEnquiry(enquiryId: string): Promise<any> {
    const enq = await axios.get<Partial<IEnquiryResponse>>(
      `${this.enqBaseUrl}/${enquiryId}`,
    );
    return enq;
  }

  async findAllEnquiry(): Promise<any> {
    const enqs = await axios.get<Partial<IEnquiryResponse[]>>(
      `${this.enqBaseUrl}/`,
    );
    return enqs;
  }

  async findEnquiryByUserId(userId: string): Promise<any> {
    const enq = await axios.get<Partial<IEnquiryResponse>>(
      `${this.enqBaseUrl}/${userId}`,
    );
    return enq;
  }

  async deleteEnquiry(enquiryId: string): Promise<any> {
    await axios.delete(`${this.enqBaseUrl}/${enquiryId}`);
  }
}
