export interface LoginCredentials {
  email: string;
  password: string;
}

export interface DemoAccount extends LoginCredentials {
  role: string;
}
