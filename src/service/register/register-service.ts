import { RegisterPayload, VerifyPayload } from '@/models/auth-modal/user.modal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const register = async (payload: RegisterPayload) => {
  try {
    const res = await axios.post(`${API_URL}/api/v2/auths/register`, {
      payload,
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

const verify = async (payload: VerifyPayload) => {
  try {
    const modifiedPayload = {
      ...payload,
      codeId: Number(payload.codeId)
    };
    const res = await axios.post(`${API_URL}/api/v2/auths/verify`, {
      payload: modifiedPayload
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

export const REGISTER_SERVICE = {
  register,
  verify
}