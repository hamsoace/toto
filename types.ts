export interface ANCVisit {
  id: string;
  visitNumber: number;
  date: string; // Using string for YYYY-MM-DD from date input
  weight: number;
  bloodPressure: string;
  ifasTablets: number;
  notes: string;
  clinicName: string;
}

export type ParentType = 'mum' | 'dad';

export interface UserData {
  _id: string;
  name: string;
  phone: string;
  parentType: ParentType;
  babyName: string;
  babyDueDate: string;
  babyId: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
}

export type FeedingType = 'breastfeeding' | 'bottle';

// Data collected from the user in the modal
export interface FeedingLogData {
    type: FeedingType;
    time: string; // ISO string for date and time
    duration?: number; // in minutes, for breastfeeding
    amount?: number; // in ml, for bottle
    notes?: string;
}

// The full object including DB properties
export interface FeedingLog extends FeedingLogData {
    id: string;
    user: string;
    baby: string;
}

// Payload for creating a new log
export type NewFeedingLogPayload = FeedingLogData & {
    user: string;
    baby: string;
};
