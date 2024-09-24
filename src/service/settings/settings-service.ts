import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



const getUser = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await axios.get(`${API_URL}/api/v2/users/get-user`,
      {
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

export const updateUser = async (
  fullName: string,
  email: string,
  phoneNumber: string | null,
  addressUser: string | null,
  genderUser: string | null
) => {
  const token = localStorage.getItem("authToken");

  try {
    const res = await fetch(`${API_URL}/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName,
        email,
        phoneNumber,
        addressUser,
        genderUser,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error during update:", error);
    throw error;
  }
};


export const SETTING_SERVICE = {
  getUser
}