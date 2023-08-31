import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/external/axiosapi';

const CommentForm = ({ post, latestPostId }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || comment.trim() === '') {
      console.log('Name and comment are required');
      return;
    }

    const data = {
      author: name,
      content: comment,
      post: post.id, // Use the post ID from props
    };

    try {
      // Retrieve the CSRF token from the cookie
      const csrfToken = getCookie('csrftoken');

      // Include the CSRF token in the request headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      };

      // Send the comment data to the server
      const response = await axiosInstance.post('/api/comments/', data, config);

      if (response.status === 201) {
        console.log('Comment submitted successfully');
        // You can trigger a refresh or update the comment list here
      } else {
        console.log('Error submitting comment');
      }
    } catch (error) {
      if (error.response) {
        console.log('Error submitting comment. Response:', error.response);
      } else {
        console.log('Error submitting comment:', error);
      }
    }

    setName('');
    setComment('');
  };

  // Function to retrieve the value of a cookie by its name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
