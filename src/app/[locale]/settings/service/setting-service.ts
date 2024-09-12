const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async () => {
    const token = localStorage.getItem("authToken");
    const url = new URL(`${API_URL}/api/user`);

    try {
        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error("Error during GET call:", error);
        throw error;
    }
};