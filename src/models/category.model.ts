export interface Category {
  Id: string;
  CategoryId: string;
  Name: string;
  Description: string;
  CategoryType: string;
  ImageUrl: string;
  IsDeleted: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: string;
  IsSelected?: boolean;
  Class?: string[];
}
