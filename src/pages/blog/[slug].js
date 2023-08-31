import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/external/axiosapi';
import BlogPostDetail from '../../Components/BlogPostDetail'; // Adjust the import path as needed

function Slug() {
  const router = useRouter();
  const { slug } = router.query;

  const [blogPost, setBlogPost] = useState(null);
  const [latestPostId, setLatestPostId] = useState(1); // Default value for latest post ID

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/blog-posts/${slug}/`);
        setBlogPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    const fetchLatestPostId = async () => {
      try {
        const response = await axiosInstance.get('/api/latest-post-id/');
        setLatestPostId(response.data.latest_post_id);
      } catch (error) {
        console.error('Error fetching latest post ID:', error);
      }
    };

    if (slug) {
      fetchBlogPost();
      fetchLatestPostId();
    }
  }, [slug]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return <BlogPostDetail post={blogPost} latestPostId={latestPostId} />;
}

export default Slug;
