export type LeadStatus = 'NEW' | 'CONTACTED' | 'COUNSELLING' | 'CAMPUS_VISIT' | 'APPLICATION' | 'ADMITTED' | 'LOST';

export interface AdmissionLead {
  id: string;
  parentName: string;
  studentName: string;
  mobile: string;
  email: string;
  classApplying: string;
  city: string;
  message?: string;
  date: string;
  source: string;
  status: LeadStatus;
  assignedStaff?: string;
  followUpDate?: string;
  notes?: string[];
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Sports' | 'Cultural' | 'Celebration' | 'Notice';
  description: string;
  fullContent?: string;
  image: string;
  isPublished: boolean;
  featured?: boolean;
}

export interface MandatoryDocument {
  id: string;
  title: string;
  category: 'Affiliation' | 'Safety' | 'Academics' | 'Administration' | 'Results';
  documentNumber: string;
  issueDate: string;
  validity: string;
  fileSize: string;
  fileUrl: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Academics' | 'Sports' | 'Events' | 'Activities' | 'Celebrations' | 'Students';
  imageUrl: string;
  caption: string;
}

export interface TransferCertificate {
  tcNumber: string;
  scholarNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  classPassed: string;
  dateOfIssue: string;
  reasonForLeaving: string;
  status: 'Verified' | 'Pending';
}

export interface FacilityItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface LeadershipMember {
  name: string;
  designation: string;
  qualification: string;
  message: string;
  fullMessage: string[];
  image: string;
}
