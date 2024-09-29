import { SearchTransaction, Transaction } from '@/models/trans-modal/trans.modal';
import { SearchCategories, TransactionCategories, UpdateCategories } from '@/models/transaction-categories-modal/transaction-categories.modal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const create = async (payload: Transaction) => {
  const token = localStorage.getItem('authToken');

  try {
    const res = await axios.post(`${API_URL}/api/v2/transactions/create-transaction`, {
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

const searchData = async (payload: SearchTransaction) => {
  const token = localStorage.getItem('authToken');
  try {
    const res = await axios.post(`${API_URL}/api/v2/transactions/get-transaction-type`, {
      payload
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    const res = await axios.patch(`${API_URL}/api/v2/transactions/update-transaction/${id}`, {
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
    const res = await axios.delete(`${API_URL}/api/v2/transactions/delete-transaction/${id}`, {
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

export const TRANSACTION_SERVICE = {
  create,
  searchData,
  updateItem,
  deleteItem
}