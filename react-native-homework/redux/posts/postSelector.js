import { createSelector } from "@reduxjs/toolkit";

export const selectAllPosts = (state) => state.posts.items;
const selectAuthorId = (state, authorId) => authorId;

export const selectPostsByAuthor = createSelector(
  [selectAllPosts, selectAuthorId],
  (posts, authorId) => {
    return posts.filter(post => post.author._id === authorId);
  }
);