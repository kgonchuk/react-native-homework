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
      formData.append("place", postData.place || "");
      formData.append("latitude", postData.latitude?.toString() || ""); 
      formData.append("longitude", postData.longitude?.toString() || ""); 

      console.log("ПЕРЕВІРКА ФОРМИ:", formData);
      console.log("FormData entries:", formData._parts);
      console.log("Відправляю на сервер:", {
        title: postData.title,
      });

      const response = await fetch("http://192.168.0.135:3000/api/posts", {
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
      const data = await response.json();
      
      console.log("ВІДПОВІДЬ СЕРВЕРА:", data); 
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


export const fetchPosts = createAsyncThunk(
 "posts/fetchPosts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://192.168.0.135:3000/api/posts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text(); 

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${responseText}`);
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.log("Помилка:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://192.168.0.135:3000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch posts");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Помилка:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, commentText, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://192.168.0.135:3000/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({ 
    text: commentText, 
    author: userId 
}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add comment");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Помилка:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const toggleLikeThunk=createAsyncThunk(
  "posts/toggleLike", async ({postId}, {rejectWithValue, getState})=>{
    try{
      const token= getState().auth.accessToken;
      const response = await fetch(`http://192.168.0.135:3000/api/posts/${postId}/toggleLike`, {
        method:"POST",
      headers: {
  "Authorization": `Bearer ${token}`, 
  "Content-Type": "application/json",
},
        
      })
      if (!response.ok) throw new Error("Не вдалося змінити лайк");
      return await response.json();
    }catch(error)
    {
      return rejectWithValue(error.message)
    }
  }
)