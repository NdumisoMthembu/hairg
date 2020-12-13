export interface Variation {
  CompanyVariationId: string;
  CompanyId: string;
  VariationId: string;
  Name: string;
  Description: string;
  IsDeleted: boolean;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  IsSelected?: boolean;
  Class?: string[];
}


