export type CreateAdminPayload = {
  employee_id: string;
  role?: number;
  access_boys_section: boolean;
  access_girls_section: boolean;
  access_residential_section: boolean;
};
