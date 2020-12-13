import { BookingItem } from './booking.item.model';
import { User } from './user.model';

export interface Booking {
  BookingId?: string;
  UserId: string;
  BookingDate: string;
  StartTime: string;
  FinishTime: string;
  Place: string;
  TimeId: string;
  TotalAmount: number;
  Status: string;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  StatusId: number;
  BookingItems: BookingItem[];
  Customer?: User;
}
