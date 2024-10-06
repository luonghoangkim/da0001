import { UpdateAmountItem } from '@/models/goals-modal/goals-response.model';
import { CreateGoalsModel } from '@/models/goals-modal/goals.modal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const create = async (payload: CreateGoalsModel) => {
    const token = localStorage.getItem('authToken');

    try {
        const modifiedPayload = {
            ...payload,
            saving_amount: Number(payload.saving_amount),
            saving_goal: Number(payload.saving_goal),
        };
        const res = await axios.post(`${API_URL}/api/v2/saving/create-saving`, {
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
    const token = localStorage.getItem("authToken");
    try {
        const res = await axios.get(`${API_URL}/api/v2/saving/get-saving`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

        return res;
    } catch (error) {
        console.error('Error during :', error);
        throw error;
    }
};


const updateAmountItem = async (id: string, payload: UpdateAmountItem) => {
    const token = localStorage.getItem('authToken');

    try {
        const res = await axios.patch(`${API_URL}/api/v2/saving/update-saving-amount/${id}`, {
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

const deleteItem = async (savingId: string, cardId: string) => {
    const token = localStorage.getItem('authToken');

    try {
        const res = await axios.delete(`${API_URL}/api/v2/saving/delete-saving/${savingId}/${cardId}`, {
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

export const GOALS_SERVICE = {
    create,
    searchData,
    // updateItem,
    deleteItem,
    getBank,
    updateAmountItem,
}