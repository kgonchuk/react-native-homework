import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, createPost, fetchAllPosts, addComment, toggleLikeThunk } from './postOperation';

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

        })
        .addCase(addComment.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addComment.fulfilled, (state, action) => {
           const post = state.items.find((p) => p._id ===action.payload.postId);
    if (post) {
      post.comments.push(action.payload);
    }
        })
        .addCase(addComment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         .addCase(toggleLikeThunk.fulfilled, (state, action)=>{

            const { postId } = action.meta.arg; 
  const post = state.items.find((p) => p._id === postId);
  if (post) {

    post.likes = action.payload.likes; 
  }
         })

    }

});

export const postsReducer = postSlice.reducer;