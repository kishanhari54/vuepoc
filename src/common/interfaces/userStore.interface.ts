// Define types for your state and actions
export interface User {
  access_token: string;
  refresh_token: string;
  sub_tenant_id: string | null;
  permissions: string[];
  name: string;
  id: string | null;
  email: string;
  roleName: string;
  sub_tenant_name: string | null;
  error: string | null;
  error_description: string | null;
}

export interface Credentials {
  email: string;
  password: string;
}
