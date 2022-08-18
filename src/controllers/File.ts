import axios from 'axios';

export interface ICreateFile {
  fileUpload: string;
  enquiryId: string;
}

interface IFile {
  createFileEnquiry: (enquiry: Partial<ICreateFile>) => any;
}

export class File implements IFile {
  private fileBaseUrl: string;

  constructor() {
    this.fileBaseUrl = `http://127.0.0.1:8000/apis/file`;
  }

  createFileEnquiry(enquiry: Partial<ICreateFile>) {
    const formData = new FormData();
    formData.append(`file`, enquiry.fileUpload);

    const file = axios.post(
      `${this.fileBaseUrl}/${enquiry.enquiryId}`,
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      },
    );
    return file;
  }
}
