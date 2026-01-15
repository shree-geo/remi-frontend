export interface User extends Record<string, unknown> {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  employee_id: string;
  role: string;
  profile: {
    office_level: "PROVINCE" | "DISTRICT" | "MUNICIPALITY" | "WARD";
    province: number;
    phone_number: string;
    alternate_phone: string;
    address: string;
  };
}
