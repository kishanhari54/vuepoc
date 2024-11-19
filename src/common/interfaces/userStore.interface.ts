// Define types for your state and actions
export interface User {
  access_token: string;
  sub_tenant_id: string;
  // Add any other properties your user object may have
}

export interface Credentials {
  email: string;
  password: string;
}
