import { CardModel } from '@/models/card-modal/credit-card.modal';
import { SearchCategories, TransactionCategories, UpdateCategories } from '@/models/transaction-categories-modal/transaction-categories.modal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const create = async (payload: CardModel) => {
    const token = localStorage.getItem('authToken');

    try {
        const modifiedPayload = {
            ...payload,
            card_number: Number(payload.card_number),
            card_amount: Number(payload.card_amount),
        };
        const res = await axios.post(`${API_URL}/api/v2/cards/create-card`, {
            payload: modifiedPayload,
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

const searchData = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.get(`${API_URL}/api/v2/cards/get-card`, {
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

const updateItem = async (id: string, payload: CardModel) => {
    const token = localStorage.getItem('authToken');

    try {
        const res = await axios.patch(`${API_URL}/api/v2/cards/update-card/${id}`, {
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
        const res = await axios.delete(`${API_URL}/api/v2/cards/delete-card/${id}`, {
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

const getBank = async () => {
    const token = localStorage.getItem('authToken');

    try {
        const res = await axios.get(`${API_URL}/api/v2/cards/banks`, {
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

export const CREDIT_CARD_SERVICE = {
    create,
    searchData,
    updateItem,
    deleteItem,
    getBank,
}