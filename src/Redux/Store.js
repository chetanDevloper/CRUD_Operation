// Redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './PostSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;