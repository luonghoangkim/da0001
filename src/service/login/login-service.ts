import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginService = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
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