import React from 'react';

const CommentList = ({ comments, blogPosts, onApproveComment, onRejectComment }) => {
  const handleApproveClick = async (commentId) => {
    onApproveComment(commentId);
  };

  const handleRejectClick = async (commentId) => {
    onRejectComment(commentId);
  };

  return (
    <div>
      {comments.map((comment) => {
        // Find the corresponding blog post for this comment
        const blogPost = blogPosts.find((post) => post.id === comment.post);

        return (
          <div key={comment.id} className="mb-4">
            <p>Blog Post: {blogPost ? blogPost.title : 'N/A'}</p>
            <p>Comment: {comment.content}</p>
            <p>Author: {comment.author}</p>
            <p>Status: {comment.is_approved ? 'Approved' : 'Pending for Approval'}</p>

            {/* Display "Approve" button if the comment is not approved */}
            {!comment.is_approved && (
              <button
                onClick={() => handleApproveClick(comment.id)}
                className="px-2 py-1 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Approve
              </button>
            )}

            {/* Display "Reject" button if the comment is not approved */}
            {!comment.is_approved && (
              <button
                onClick={() => handleRejectClick(comment.id)}
                className="px-2 py-1 ml-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Reject
              </button>
            )}

            {/* Display nothing if the comment is approved or rejected */}
            {comment.is_approved && (
              <p>This comment is {comment.is_approved ? 'Approved' : 'Rejected'}.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
