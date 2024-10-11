import { UpdateUserPayload } from "@/models/auth-modal/user.modal";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUser = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await axios.get(`${API_URL}/api/v2/users/get-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const token = localStorage.getItem("authToken");

  try {
    const modifiedPayload = {
      ...payload,
      phone: Number(payload.phone),
      gender: payload.gender ? "male" : "female",
    };
    const res = await axios.patch(
      `${API_URL}/api/v2/users/update-user`,
      {
        payload: modifiedPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const token = localStorage.getItem("authToken");

  try {
    const modifiedPayload = {
      ...payload,
    };
    const res = await axios.patch(
      `${API_URL}/api/v2/users/change-password`,
      {
        payload: modifiedPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.error("Error during change password:", error);
    throw error;
  }
};

export const SETTING_SERVICE = {
  getUser,
  updateUser,
  changePassword,
};
