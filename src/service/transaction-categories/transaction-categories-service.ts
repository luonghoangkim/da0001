import { RegisterPayload, VerifyPayload } from '@/models/auth-modal/user.modal';
import { SearchCategories, TransactionCategories, UpdateCategories } from '@/models/transaction-categories-modal/transaction-categories.modal';
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
    console.error('Error during category creation:', error);
    throw error;
  }
};

const searchData = async (payload: SearchCategories) => {
  try {
    const res = await axios.post(`${API_URL}/api/v2/categories/categories-type`, {
      payload
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res;
  } catch (error) {
    console.error('Error during category search:', error);
    throw error;
  }
};

const updateItem = async (id: string, payload: UpdateCategories) => {
  const token = localStorage.getItem('authToken');

  try {
    const res = await axios.patch(`${API_URL}/api/v2/categories/update-cate/${id}`, {
      payload
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error('Error during category update:', error);
    throw error;
  }
};

const deleteItem = async (id: string) => {
  const token = localStorage.getItem('authToken');

  try {
    const res = await axios.delete(`${API_URL}/api/v2/categories/delete-cate/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error('Error during category deletion:', error);
    throw error;
  }
};

export const TRANSACTION_CATEGORIES_SERVICE = {
  create,
  searchData,
  updateItem,
  deleteItem
}