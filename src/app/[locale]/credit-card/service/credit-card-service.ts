
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCreditCard = async (bank_name: string, card_number: number, total_amount: number) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`${API_URL}/api/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bank_name, card_number, total_amount }),
        });

        if (res.ok) {
            const data = await res.json();
            return data.creditCards;
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error during call:', error);
        throw error;
    }
};

export const getCreditCards = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`${API_URL}/api/card`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.ok) {
            const data = await res.json();
            return data.creditCards;
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error during GET call:', error);
        throw error;
    }
};

export const deleteCreditCards = async (card_id: string) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`${API_URL}/api/card`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ card_id }),
        });
        if (res.ok) {
            const data = await res.json();
            return data.creditCards;
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error during GET call:', error);
        throw error;
    }
};

export const updateCreditCards = async (card_id: string, bank_name: string, card_number: string) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`${API_URL}/api/card`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ card_id: card_id, bank_name: bank_name, card_number: card_number }),
        });
        if (res.ok) {
            const data = await res.json();
            return data.creditCards;
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error during GET call:', error);
        throw error;
    }
};
