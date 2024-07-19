import axios from 'axios';
import { LoginResponse } from '../types/AuthTypes';

const API_URL = 'http://masine.tridan.rs/parametri.php';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.get<LoginResponse>(API_URL, {
      params: {
        action: 'povuciPodatkeAndroidKorisnik',
        tag: 'login',
        email,
        p: password
      }
    });

    const data: LoginResponse = response.data;

    /* Validate response data */
    if (data.success) {
      return data;
    } else {
      throw new Error(data.error_msg || 'Login failed');
    }
  } catch (error: any) {
    /* Handle network or other errors */
    const errorMessage = error.response?.data?.error_msg || error.message || 'Network error';
    throw new Error(errorMessage);
  }
};

