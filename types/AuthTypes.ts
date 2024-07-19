export interface LoginResponse {
  success: boolean;
  error_msg?: string; 
  error?: number;     
  tag?: string; 
}

export interface RegisterResponse {
  success: boolean;
  error_msg?: string;
  error?: number;
  tag?: string;
}
