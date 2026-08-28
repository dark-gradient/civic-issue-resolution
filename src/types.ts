export type IssueStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Assigned' 
  | 'In Progress' 
  | 'Resolved' 
  | 'Awaiting Verification' 
  | 'Reopened'
  | 'Closed';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Department = 'Roads' | 'Sanitation' | 'Electrical' | 'Drainage' | 'Water' | 'Parks' | 'Unassigned';

export type AuthState = 'NOT_AUTHENTICATED' | 'MOBILE_VERIFIED' | 'IDENTITY_VERIFICATION_PENDING' | 'IDENTITY_VERIFIED' | 'AUTHENTICATED';
export type GovRole = 'Municipal Administrator' | 'Department Supervisor' | 'Department Officer' | 'Field Staff' | 'Analyst';

export interface CitizenUser {
  type: 'Citizen';
  id: string;
  name: string;
  phone: string;
  aadhaarVerified: boolean;
  identityHash?: string;
  phoneHash?: string;
  preferredLanguage: string;
  location: string;
  createdAt: string;
  reportsCount: number;
  resolvedCount: number;
  reopenedCount: number;
  contributionScore: number;
}

export interface GovUser {
  type: 'Government';
  id: string;
  name: string;
  role: GovRole;
  department: string;
}

export type User = CitizenUser | GovUser;

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  status: string;
  description: string;
  actor?: string;
  action?: string;
  notes?: string;
}

export interface Issue {
  id: string;
  title: string;
  type: string;
  location: string;
  ward: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  status: IssueStatus;
  priority: Priority;
  department: Department;
  reportedAt: string;
  updatedAt: string;
  reportsCount: number;
  aiConfidence: number;
  assignee: string;
  slaHours: number;
  slaRemaining: string;
  images: { before: string; after?: string };
  privacyProcessed?: boolean;
  facesBlurred?: number;
  timeline: TimelineEvent[];
  originalLanguage: string;
  originalDescription: string;
  description: string;
  authority: string;
  isOfflineSync?: boolean;
}

export type Role = 'Citizen' | 'Government';
