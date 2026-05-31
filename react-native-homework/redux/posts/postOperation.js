import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: postData.photo,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      formData.append("title", postData.title);
      formData.append("place", postData.place || ""); // Додайте пустий рядок, якщо place відсутній
      formData.append("latitude", postData.latitude?.toString() || ""); // Додайте пустий рядок, якщо latitude відсутній
      formData.append("longitude", postData.longitude?.toString() || ""); // Додайте пустий рядок, якщо longitude відсутній

      console.log("ПЕРЕВІРКА ФОРМИ:", formData);
      console.log("FormData entries:", formData._parts);
      console.log("Відправляю на сервер:", {
        title: postData.title,
      });
      const response = await fetch("http://192.168.0.108:3000/api/posts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${postData.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      //   return await response.json();
      const data = await response.json();
      console.log("ВІДПОВІДЬ СЕРВЕРА:", data); // Подивіться, чи там є 'data' чи це сам пост
      return data;
    } catch (error) {
      console.log(
        "Помилка створення поста:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
);
