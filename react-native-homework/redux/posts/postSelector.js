

export const selectAllPosts = (state) => state.posts.items;

export const selectPostsByAuthor = (state, userId) => {
  const posts = state.posts.items || []; 
  
  return posts.filter((post) => {
    if (post.author && typeof post.author === 'object') {
      const authorId = post.author._id || post.author.id;
      return authorId === userId;
    }
    
    return post.author === userId;
  });
};