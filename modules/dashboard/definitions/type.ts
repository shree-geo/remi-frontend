export type UserRole =
  | "super_admin"
  | "social_mobilizer"
  | "family_counselor"
  | "economic_counselor"
  | "project_manager"
  | "moless_viewer";

export type VulnerabilityLevel = "non" | "low" | "medium" | "high";

export type CaseStatus =
  | "registered"
  | "screening"
  | "assessment"
  | "action_planning"
  | "follow_up"
  | "closed";

export type Gender = "male" | "female" | "other";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  location?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Returnee {
  id: string;
  registrationId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  email?: string;
  passportNumber?: string;
  address: {
    province: string;
    district: string;
    municipality: string;
    ward: string;
  };
  migrationHistory: {
    destinationCountry: string;
    departureDate: string;
    returnDate: string;
    reasonForReturn: string;
  };
  consent: {
    given: boolean;
    date: string;
  };
  status: CaseStatus;
  vulnerabilityLevel?: VulnerabilityLevel;
  assignedCounselorId?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScreeningForm {
  id: string;
  returneeId: string;
  responses: Record<string, string | number | boolean>;
  vulnerabilityScore: number;
  submittedAt?: Date;
  createdAt: Date;
}

export interface ActionPoint {
  id: string;
  returneeId: string;
  type: string;
  description: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
  referralOrganization?: string;
  createdById: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface FollowUp {
  id: string;
  actionPointId: string;
  notes: string;
  nextFollowUpDate?: string;
  status: "completed" | "in_progress" | "modified";
  createdAt: Date;
}

export interface DashboardStats {
  totalRegistered: number;
  activeCases: number;
  closedCases: number;
  overdueFollowUps: number;
  vulnerabilityBreakdown: {
    non: number;
    low: number;
    medium: number;
    high: number;
  };
}
