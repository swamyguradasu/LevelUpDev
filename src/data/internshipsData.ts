export type ApplicationStatus = 'Interested' | 'Under Review' | 'Selected' | 'Not Selected';

export interface InternshipApplication {
  id: string;
  user_id?: string;
  internship_id: string;
  internship_title: string;
  full_name: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  status: ApplicationStatus;
  submitted_at: string;
  admin_notes?: string;
}

