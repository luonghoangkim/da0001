
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCreditCard = async (bank_name: string, card_number: number,) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`${API_URL}/api/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bank_name, card_number }),
        });

        return res;
    } catch (error) {
        console.error('Error during call:', error);
        throw error;
    }
};




