import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCreditCard = async (bank_name: string, card_number: number, total_amount: number) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.post(`${API_URL}/api/goals`, {
            bank_name,
            card_number,
            total_amount
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data.creditCards;
    } catch (error: any) {
        console.error('Error during call:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getCreditCards = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.get(`${API_URL}/api/goals`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data.creditCards;
    } catch (error: any) {
        console.error('Error during GET call:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const deleteCreditCards = async (card_id: string) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.delete(`${API_URL}/api/goals`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { card_id }
        });

        return res.data.creditCards;
    } catch (error: any) {
        console.error('Error during DELETE call:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateCreditCards = async (card_id: string, bank_name: string, card_number: string) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.patch(`${API_URL}/api/goals`, {
            card_id,
            bank_name,
            card_number
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return res.data.creditCards;
    } catch (error: any) {
        console.error('Error during PATCH call:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};