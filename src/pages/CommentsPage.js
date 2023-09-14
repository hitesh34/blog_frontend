// CommentsPage.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/external/axiosapi';
import CommentList from '../Components/CommentList';

function CommentsPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/api/comments/?post=${slug}`);
        setComments(response.data.results);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (slug) {
      fetchComments();
    }
  }, [slug]);

  const handleApproveComment = async (commentId) => {
    try {
      // Make an API request to update the comment's approval status
      await axiosInstance.post(`/api/comments/${commentId}/approve/`);
  
      // Update the local state to reflect the approval
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, is_approved: true } : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleRejectComment = async (commentId) => {
    try {
      // Make an API request to update the comment's rejection status
      await axiosInstance.post(`/api/comments/${commentId}/reject/`);
  
      // Update the local state to reflect the rejection
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, is_approved: false } : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };
  
  return (
    <div>
      <h1>Comments for Blog Post</h1>
      <CommentList
        comments={comments}
        onApproveComment={handleApproveComment}
        onRejectComment={handleRejectComment}
      />
    </div>
  );
}

export default CommentsPage;
