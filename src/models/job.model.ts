import { JobWork } from './job.work.model';

export interface Job {
  JobId: string;
  CompanyId: string;
  CustomerId: string;
  CustomerName: string;
  JobNo: string;
  Tittle: string;
  Description: string;
  TotalCost: number;
  TotalDays: 0;
  StartDate?: any;
  DueDate?: any;
  Status: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  JobWorks?: JobWork[];
}
