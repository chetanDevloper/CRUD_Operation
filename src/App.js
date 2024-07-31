import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, removePost, changePage } from './Redux/PostSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { posts, currentPage, loading, error } = useSelector((state) => state.posts);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchPosts())
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [dispatch]);

  const handleRemovePost = (id) => {
    dispatch(removePost(id));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(changePage(pageNumber));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {errorMessage}</div>;
  }

  const startIndex = (currentPage - 1) * 6;
  const endIndex = currentPage * 6;
  const currentPagePosts = posts.slice(startIndex, endIndex);

  return (
    <div className="col ">
      {currentPagePosts.slice(0, 6).map((post) => (
        <div class="card" style={{ "width": "18rem;", }}>
          <div class="card-body">
            <h5 class="card-title">{post.userId}</h5>
            <h5 class="card-title">{post.id}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{post.body}</h6>
            <p class="card-text">{post.title}</p>
            <button onClick={() => handleRemovePost(post.id)} className="btn btn-danger">Remove</button>
          </div>
        </div>

      ))
      }
      <div>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className="btn btn-primary ms-5">Previous</button>
        )}
        {currentPage < Math.ceil(posts.length / 6) && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-primary ms-5">Next</button>
        )}
      </div>
    </div >
  );
}

export default App;