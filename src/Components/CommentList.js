import React from 'react';
import { axiosInstance } from '@/external/axiosapi';

const CommentList = ({ comments, onApproveComment, onRejectComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <p>{comment.content}</p>
          <p>Author: {comment.author}</p>
          <p>Status: {comment.is_approved ? 'Approved' : 'Pending Approval'}</p>

          {/* Approve Button */}
          {!comment.is_approved && (
            <button
              onClick={() => onApproveComment(comment.id)}
              className="px-2 py-1 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Approve
            </button>
          )}

          {/* Reject Button */}
          {!comment.is_approved && (
            <button
              onClick={() => onRejectComment(comment.id)}
              className="px-2 py-1 ml-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Reject
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
