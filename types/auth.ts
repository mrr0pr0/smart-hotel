export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role:
    | "admin"
    | "receptionist"
    | "chef"
    | "waiter"
    | "housekeeper"
    | "room-service";
  department?: string;
  status: string;
  shift?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: User["role"];
  department?: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token?: string;
}
