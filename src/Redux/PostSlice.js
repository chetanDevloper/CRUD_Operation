import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});



const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPage: 1,
    loading: true,
  },
  reducers: {
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id!== action.payload);
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const  { removePost, changePage } = postSlice.actions;
export default postSlice.reducer;