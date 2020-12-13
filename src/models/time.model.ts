export interface TimeSlot {
  TimeSlotId : number;
  StartTime: string;
  FinishTime: string;
  TimeId: string;
  CurrentCapacity: number;
  MaxCapacity: number;
  CompanyId: string;
  Class?: string[];
  StatusId: number;
}
