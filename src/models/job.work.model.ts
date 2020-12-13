export interface JobWork {
  JobWorkId: string;
  JobId: string;
  Tittle: string;
  Description: string;
  TotalCost: number;
  Quantity: number;
  TotalHours: string;
  StartDate: string;
  DueDate: string;
  Status: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
}