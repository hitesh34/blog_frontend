import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import { axiosInstance } from '@/external/axiosapi';
import MarkdownRenderer from './MarkdownRenderer';

function BlogPostDetail({ post }) {
  const [comments, setComments] = useState([]);
  const [latestPostId, setLatestPostId] = useState(0); // Add this state

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/comments/?is_approved=true&post=${post.id}`);
      setComments(response.data.results);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchLatestPostId(); // Fetch latestPostId
  }, []);

  const fetchLatestPostId = async () => {
    try {
      const response = await axiosInstance.get('/api/latest-post-id/');
      setLatestPostId(response.data.latest_post_id);
    } catch (error) {
      console.error('Error fetching latest post ID:', error);
    }
  };

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">{post.category}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">{post.intro}</p>
  
        <div className="mt-10 max-w-2xl space-y-6">
          {post.content_blocks && post.content_blocks.map((block) => {
            console.log('Rendering content block with content type:', block.content_type);
  
            if (block.content_type === 7) {
              return (
                <div key={block.id}>
                  <img src={block.actual_content.image_url} alt={block.actual_content.caption} />
                  <p>{block.actual_content.caption}</p>
                </div>
              );
            }
  
            if (block.content_type === 9) {
              const paragraphs = block.actual_content.content.split('\n');
              
              return (
                <div key={block.id}>
                  {paragraphs.map((paragraph, index) => (
                    <div key={index} className={`mb-4 ${index !== 0 ? 'mt-8' : ''}`}>
                      <MarkdownRenderer content={paragraph} />
                    </div>
                  ))}
                </div>
              );
            }
  
            if (block.content_type === 13) {
              return (
                <div
                  key={block.id}
                  className="border border-gray-300 rounded p-4 flex items-center space-x-3"
                >
                  <img
                    src={block.actual_content.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full bg-gray-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Name: {block.actual_content.name}</p>
                    <p>Email: {block.actual_content.email}</p>
                  </div>
                </div>
              );
            }
  
            if (block.content_type === 12) {
              console.log('Block 12 actual_content:', block.actual_content);
  
              if (block.actual_content && block.actual_content.table_data) {
                return (
                  <DataTable data={block.actual_content.table_data} responsiveColumns={{}} key={block.id} />
                );
              }
            }
  
            if (block.content_type === 14) {
              return (
                <div key={block.id}>
                  <CommentForm post={post} />
                </div>
              );
            }
  
            return (
              <p key={block.id} className="mt-4 text-gray-500">
                No valid content found for this block
              </p>
            );
          })}
  
          {/* Render approved comments */}
          {/* Render approved comments */}
          <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <ul className="space-y-4">
          {comments
            .filter((comment) => comment.is_approved && comment.post === post.id) // Filter approved comments for the specific post
            .map((comment) => (
              <li key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <p>{comment.content}</p>
                <p>Author: {comment.author}</p>
              </li>
      ))}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
}

export default BlogPostDetail;