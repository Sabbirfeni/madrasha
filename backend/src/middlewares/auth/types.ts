export type AuthenticatedAdmin = {
  sub: string;
  employee_id: string;
  role: number;
  permissions?: {
    access_boys_section: boolean;
    access_girls_section: boolean;
  };
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
};
