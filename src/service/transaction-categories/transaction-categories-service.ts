import { RegisterPayload, VerifyPayload } from '@/models/auth-modal/user.modal';
import { TransactionCategories } from '@/models/transaction-categories-modal/transaction-categories.modal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const create = async (payload: TransactionCategories) => {
  const token = localStorage.getItem('authToken');

  try {
    const res = await axios.post(`${API_URL}/api/v2/categories/create-category`, {
      payload,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const getListData = async (payload: VerifyPayload) => {
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

export const TRANSACTION_CATEGORIES_SERVICE = {
  create,
  getListData
}