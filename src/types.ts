export interface RsvpSubmission {
  id: string;
  name: string;
  phone: string;
  guests: number;
  attending: boolean;
  notes?: string;
  submittedAt: string;
}
