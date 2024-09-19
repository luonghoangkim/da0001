import { LoginPayload } from '@/models/auth-modal/user.modal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginService = async (payload: LoginPayload) => {
  try {
    console.log('Sending payload:', payload); 
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      payload
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
