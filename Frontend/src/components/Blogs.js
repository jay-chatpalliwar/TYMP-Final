import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import striptags from "striptags";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userRole = null;
  // let autorName = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
    console.log("role : ", userRole);
  }

  // console.log(token);
  // console.log("name : ",token.name);
  // console.log("role : ",token.role);

  useEffect(() => {
    // Fetch the list of blog posts from the server when the component mounts
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  }, []);

  const navigateToPost = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (  
    <div className="w-full bg-gray-300 h-screen overflow-hidden">
      <div className="container mx-auto overflow-y-auto px-16  h-full">
        <h3 className="text-3xl font-semibold text-gray-800 my-4 text-center mb-5">
          Blog Posts
        </h3>

        {userRole === "teacher" || userRole === "admin" || userRole==="faculty" ? (
          <div className="flex justify-end my-4">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => navigate("/blogs/create")}
            >
              Create Blog
            </button>
          </div>
        ) : null}

        {loading && !posts ? (
          <span class="loader"></span>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
           
          {posts.map((post) => (
            <div
              className="flex flex-col justify-between h-full  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              key={post._id}
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {HTMLReactParser(striptags(post.body).substring(0, 100))}...
              </p>
              <div className="flex justify-between items-center text-gray-500 mt-2">
                <span className="text-sm">By {post.createdBy}</span>
                <Link
                  to={`/blog/${post._id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-right" // Use 'sm:text-right' for small screens
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
