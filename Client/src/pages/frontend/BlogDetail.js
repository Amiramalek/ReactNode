import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-10 text-lg font-medium">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!post) return <div className="text-center text-gray-500 py-10">Post not found</div>;

  return (
    <>
      {/* Blog Detail Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="">
          <img
            src={`http://localhost:5000/${post.image?.replace(/\\/g, '/')}`}
            alt={post.name}
            className="w-full h-auto rounded-md mb-6 object-cover"
          />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">{post.name}</h1>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {post.description}
          </p>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
