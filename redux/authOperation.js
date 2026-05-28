import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { removeToken, saveToken } from "../../services/storage";
import { get } from "mongoose";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return {};
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
  return {};
};

axios.defaults.baseURL = "http://localhost:3000"; // Заміни на свій базовий URL сервера

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", credentials);

      const { accessToken, user } = response.data; // Узгоджено з бекендом
      setAuthHeader(accessToken);
    //   toast.success(`Welcome ${user.username}`);

      // Додайте збереження в localStorage, щоб не втратити токен після перезавантаження
      await saveToken(accessToken);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      const { accessToken, user } = response.data;

      setAuthHeader(accessToken);
    //   toast.success(`Welcome ${user.username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth?.accessToken;
    //  Якщо токена немає, ми не можемо надіслати запит на вихід.
    if (!token) {
      clearAuthHeader();
      await removeToken("accessToken");
      await removeToken("refreshToken");
      toast.error("Logout successful (No token to revoke)");
      return true;
    }

    await axios.post("/api/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    clearAuthHeader();
    toast.success("We are waiting for you again!");
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refres",
  async (_, { rejectWithValue }) => {
    const savedToken = await getToken();
    if (!savedToken) {
      return rejectWithValue("No token found");
    }
    try {
        setAuthHeader(savedToken);
      const response = await axios.get("/api/auth/refresh");
    return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to refresh user"
      );
    }
  }
);