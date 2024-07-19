import axios from 'axios';
import { RegisterResponse } from '../types/AuthTypes';

const API_URL = 'http://masine.tridan.rs/parametri.php';

export const register = async (email: string, password: string, firstName: string, lastName: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.get<RegisterResponse>(API_URL, {
      params: {
        action: 'registrujAndroid',
        email,
        sifra: password,
        komitentime: firstName,
        komitentprezime: lastName
      }
    });

    const data: RegisterResponse = response.data;

    /* Validate response data */
    if (data.success) {
      return data;
    } else {
      throw new Error(data.error_msg || 'Registration failed');
    }
  } catch (error: any) {
    /* Handle network or other errors */
    const errorMessage = error.response?.data?.error_msg || error.message || 'Network error';
    throw new Error(errorMessage);
  }
};
