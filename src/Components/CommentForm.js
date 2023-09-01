import React, { useState } from 'react';
import { axiosInstance } from '@/external/axiosapi';

const CommentForm = ({ post }) => {
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
      post: post.id,
    };

    try {
      const csrfToken = getCookie('csrftoken');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      };

      const response = await axiosInstance.post('/api/comments/', data, config);

      if (response.status === 201) {
        console.log('Comment submitted successfully');
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

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
