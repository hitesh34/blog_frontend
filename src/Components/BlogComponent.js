import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/external/axiosapi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import DataTable from './DataTable'; // Import the DataTable component

function BlogComponent() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/blog-posts/?page=${currentPage}`);
        const postsArray = response.data.results;
        setPosts(postsArray);
        setTotalPages(response.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, [currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  
  const renderContentBlock = (block) => {
    if (!block.content_type) {
      console.error('Content Type is undefined for block:', block);
      return <p>Content Type is undefined</p>;
    }
  
    const contentTypeString = `${block.content_type.app_label}.${block.content_type.model}`;
  
    switch (contentTypeString.toLowerCase()) {
      case 'home.textblock':
        return renderTextBlock(block.content_object);
      case 'home.imageblock':
        return renderImageBlock(block.content_object);
      case 'home.mapblock':
        return renderMapBlock(block.content_object);
      case 'home.datablock':
        return renderDataTableBlock(block.content_object);
      case 'home.userblock': // Add this case for user block
        return renderUserBlock(block.content_object);
      case 'home.comment':
        return renderCommentForm(block.content_object);  
     
      default:
        return null; // Or any other fallback component
    }
  };
  
  const renderImageBlock = (contentObject) => {
    return (
      <div>
          <img src={`/media/blog_images/${contentObject.image}`} alt={contentObject.caption} />
        <p>{contentObject.actual_content.caption}</p>
      </div>
    );
  };

  const renderTextBlock = (contentObject) => {
    return (
      <div>
        <p>{contentObject.content}</p>
      </div>
    );
  };


  const renderDataTableBlock = (contentObject) => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Durée</th>
              <th>Compétitivité</th>
              <th>Taux</th>
              <th>Mensualités</th>
            </tr>
          </thead>
          <tbody>
            {contentObject.table_data.map((row, index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  


  const renderMapBlock = (contentObject) => {
    return (
      <div>
        {/* You can render your map here */}
      </div>
    );
  };
  const renderUserBlock = (contentObject) => {
    return (
      <div>
        {contentObject.name && <p>Name: {contentObject.name}</p>}
        {contentObject.email && <p>Email: {contentObject.email}</p>}
        {contentObject.avatar_url && (
          <img src={contentObject.avatar_url} alt="Avatar" />
        )}
      </div>
    );
  };

  const renderCommentForm = () => {
    return <CommentForm onSubmit={handleCommentSubmit} />;
  };


  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full">
                <img
                  src={post.image_url || 'https://picsum.photos/200'}
                  alt={post.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.pub_date} className="text-gray-500">
                    {post.publication_date} {/* Display the publication date */}
                  </time>
                  {post.category && post.category.href && (
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category} {/* Display the category */}
                    </a>
                  )}
                </div>
                <div className="group relative center">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 center">
                    <Link href={`/blog/${post.id}`}>
                      <span className="absolute inset-0 center" />
                      {post.title}
                    </Link>
                  </h3>
                  {/* Add initial lines of blog post content here */}
                  <p className="mt-2 text-sm leading-6 text-gray-600 center">
                    {post.subtitle} {/* Display the subtitle */}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  {post.author && post.author.imageUrl ? (
                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100" />
                  )}
                  <div className="text-sm leading-6">
                    {post.author ? (
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                    ) : (
                      <p className="text-gray-900">HomeOpen</p>
                    )}
                  </div>
                </div>
                <div className="mt-10 max-w-2xl">
                  {post.content_blocks && post.content_blocks.map((block) => (
                    <div key={block.id}>
                      {renderContentBlock(block)}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          {/* Pagination Buttons */}
          {currentPage > 1 && (
            <button
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {Array.from({ length: Math.ceil(totalPages / 10) }).map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < Math.ceil(totalPages / 10) && (
            <button
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default BlogComponent;
