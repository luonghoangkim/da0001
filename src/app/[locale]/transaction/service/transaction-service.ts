const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createTransaction = async (payload: {
  amount: number;
  description: string;
  category_name: string;
  type: string;
  status: string;
}) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await fetch(`${API_URL}/api/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ payload }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.transaction;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error during call:", error);
    throw error;
  }
};

export const getTransaction = async (
  page: number,
  limit: number,
  type?: string
) => {
  const token = localStorage.getItem("authToken");
  const url = new URL(`${API_URL}/api/transaction`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());
  if (type) {
    url.searchParams.append("type", type);
  }

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

export const deleteTransaction = async (card_id: string) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await fetch(`${API_URL}/api/transaction`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ card_id }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.transaction;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error during GET call:", error);
    throw error;
  }
};

export const updateTransaction = async (
  card_id: string,
  bank_name: string,
  card_number: string
) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await fetch(`${API_URL}/api/transaction`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        card_id: card_id,
        bank_name: bank_name,
        card_number: card_number,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.transaction;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error during GET call:", error);
    throw error;
  }
};
