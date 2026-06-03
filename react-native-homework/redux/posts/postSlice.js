import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, createPost, fetchAllPosts } from './postOperation';

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
myPosts: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("ДАНІ В REDUCER:", action.payload);
          state.items = [...action.payload];
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(createPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
        .addCase(createPost.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        })
        .addCase(fetchAllPosts.rejected, (state, action) => {
            state.isLoading = false;

        }); 

    }
});

export const postsReducer = postSlice.reducer;