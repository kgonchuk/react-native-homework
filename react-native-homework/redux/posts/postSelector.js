
export const selectAllPosts = (state) => state.posts.items;


export const selectPostsByAuthor = (state, userId) => {
  if (!userId) return [];
  return state.posts.items.filter((post) => {

    const authorIdFromPost = post.author?._id || post.author; 
    return String(authorIdFromPost) === String(userId);
  });
};