import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/external/axiosapi';
import CommentList from '../Components/CommentList';

function CommentsPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [comments, setComments] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]); // New state to hold the blog posts

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/api/comments/?post=${slug}`);
        // Ensure "Pending for Approval" status for new comments
        const updatedComments = response.data.results.map((comment) => ({
          ...comment,
          is_approved:
            comment.is_approved === null ? null : comment.is_approved, // Keep null for pending comments
        }));
        setComments(updatedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await axiosInstance.get(`/api/blog-posts/`);
        setBlogPosts(response.data.results);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    if (slug) {
      fetchComments();
      fetchBlogPosts();
    }
  }, [slug]);

  const handleApproveComment = async (commentId) => {
    try {
      // Make an API request to update the comment's approval status
      await axiosInstance.post(`/api/comments/${commentId}/approve/`);

      // Update the local state to reflect the approval
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              is_approved: true, // Set status to Approved
            }
          : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleRejectComment = async (commentId) => {
    try {
      // Make an API request to reject the comment
      await axiosInstance.post(`/api/comments/${commentId}/reject/`);
  
      // Find the index of the rejected comment in the local state
      const commentIndex = comments.findIndex((comment) => comment.id === commentId);
  
      if (commentIndex !== -1) {
        // Create a copy of the comments array
        const updatedComments = [...comments];
  
        // Update the status of the rejected comment to "Rejected"
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          is_approved: false,
        };
  
        // Remove the rejected comment from the local state
        updatedComments.splice(commentIndex, 1);
  
        // Update the local state to reflect the changes
        setComments(updatedComments);
      }
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };
  

  // Find the corresponding blog post for this comment
  const blogPost = blogPosts.find((post) => post.slug === slug);
  const postTitle = blogPost ? blogPost.title : 'N/A';

  return (
    <div>
      <h1>Comments for Blog Post: {postTitle}</h1> {/* Display the blog post title */}
      <CommentList
        comments={comments}
        blogPosts={blogPosts}
        onApproveComment={handleApproveComment}
        onRejectComment={handleRejectComment}
      />
    </div>
  );
}

export default CommentsPage;
