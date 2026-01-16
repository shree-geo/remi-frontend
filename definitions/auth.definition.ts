export interface SessionPayload extends Record<string, unknown> {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    username: string;
    employee_id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    role: string;
    role_details: {
      id: string;
      name: string;
      code: string;
    };
    phone: string;
    mobile: string;
    is_active: boolean;
    is_verified: boolean;
    is_approved: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: boolean;
    last_login_ip: boolean;
    password_changed_at: string;
    profile_details: {
      office_level: string;
      office_level_display: string;
      province: string | null;
      district: string | null;
      municipality: string | null;
      designation: string;
      department: string;
      office_address: string;
      profile_photo: string | null;
      bio: string;
      emergency_contact_name: string;
      emergency_contact_phone: string;
      full_location: string;
      geographic_scope: {
        level: string;
        province_id: string | null;
        district_id: string | null;
        municipality_id: string | null;
        has_full_access: boolean;
      };
      created_at: string;
      updated_at: string;
    };
    created_by: null | string;
    created_at: string;
    updated_at: string;
  };
  permissions: {
    role_code: string;
    can_create_users: boolean;
    can_manage_cases: boolean;
    can_manage_trainings: boolean;
    can_view_reports: boolean;
    can_export_data: boolean;
    can_manage_settings: boolean;
  };
  geographic_scope: {
    level: string;
    province_id: string | null;
    district_id: string | null;
    municipality_id: string | null;
    has_full_access: boolean;
  };
}
