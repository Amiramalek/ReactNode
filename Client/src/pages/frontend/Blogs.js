// src/pages/Blogs.js
import React, { Component } from 'react';
import { getAllPosts } from '../../api';
import { Link } from 'react-router-dom';

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const blogPosts = await getAllPosts();
      this.setState({ posts: blogPosts });
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <>
        {/* Banner Section */}
        <section className="bg-[url('http://localhost:3000/assets/images/abtt-banner.jpg')] bg-opacity-25 bg-cover bg-center w-full py-16 md:py-32">
          <div className="md:container md:mx-auto px-[15px]">
            <div className="main-about items-center">
              <div className="text-center pt-4 md:pt-0">
                <h2 className="text-3xl md:text-2xl lg:text-5xl text-white font-semibold">
                  Blogs
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="py-8">
          <div className='md:container md:mx-auto px-[15px]'>
            {posts.length === 0 ? (
              <p className="text-center text-lg">No posts found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`}
                      alt="Blog"
                      className="w-full h-64 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">{post.name}</h2>
                    <p className="text-gray-700 text-base mb-4">
                      {post.description.slice(0, 100)}...
                    </p>
                    <Link
                      to={`/blogs/${post._id}`}
                      className="bg-[#8B6D5C] text-white rounded-lg py-2 px-8 mr-4"
                    >
                      Read More
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
}

export default Blogs;
