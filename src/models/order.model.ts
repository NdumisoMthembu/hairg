import { Orderproduct } from './order.product.model';
import { Product } from './product.model';
import { User } from './user.model';

export interface Order {
  OrdersId: string;
  OrderNo: string;
  CompanyId: string;
  CustomerId: string;
  AddressId: string;
  Notes: string;
  OrderType: string;
  Total: number;
  Paid: number;
  Due: number;
  InvoiceDate: Date;
  DueDate: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  Status: string;
  StatusId: number;
  Orderproducts?: Orderproduct[];
  Customer?: User;
}