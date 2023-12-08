// In FullPost.js
import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import striptags from "striptags";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import Sideb from "./Sideb";
import "./Loader.css";

const Post = () => {
  const [post, setPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const { postId } = useParams(); // Get the postId from the route

  // const token = localStorage.getItem("token");
  // let user = null;
  // // let autorName = null;
  // if (token) {
  //   const decodedToken = jwtDecode(token);
  //   user = decodedToken.name;
  // }
  const [user,setuser]=useState({})
  const em = localStorage.getItem('email');
   const token = localStorage.getItem('token');
   console.log("Data taken from token.")
   console.log(token)
   console.log(em)
   
    const getprofile = async (e) => {
    // login
 try{ 
   console.log("gp called")
    //  const loadToast = toast.loading("Hang Up!");
      const response = await fetch(`http://localhost:4000/getProfile`,{
       method:'POST',
       body:JSON.stringify({
         email:em,
         token:token
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data = await response.json();
     
     
      // setTimeout(() => {
      //   toast.dismiss(loadToast)
      // }, 1000);
      
      
      
      if(response.ok)
      { 
       
        console.log(data.user)
         setuser(localStorage.getItem("name"))
        //  setrole(data.user.role)
        //  setSemester(data.user.current_sem);
      }
      // else
      // {
      // setTimeout(()=>{toast.error(data.message)},1000);
      
      // }
    }
    catch(e)
    {
      console.log("error at profile fetch - "+e);
    }
  };

  useEffect(() => {
    getprofile();
    // Fetch the full post details using the postId
    fetch(`http://localhost:4000/post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data.data);
        console.log("post.body:", post.body);
      })
      .catch((error) => {
        console.log("Error fetching post details:", error);
      });

    // Fetch comments for the post
    fetch(`http://localhost:4000/post/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments(data.comments);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      });
  }, [postId]);

  //creating the comment
  const handleCreateComment = () => {
    if (commentInput.trim() === "") {
      // Prevent creating empty comments
      return;
    }

    // Send the comment to the server
    fetch(`http://localhost:4000/post/${postId}/comments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user?.name,
        body: commentInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments([...comments, data.comment]); // Add the new comment to the list of comments
        setCommentInput(""); // Clear the comment input field
      })
      .catch((error) => {
        console.log("Error creating comment:", error);
      });
  };

  const generateAvatarUrl = (name) => {
    let formattedName;
    console.log(user);
    console.log(name);
    // if (user === name) {
    //   formattedName = "Me";
    // } else {
      formattedName = name.replace(/\s+/g, "+");
    // }
    // Replace spaces in the name with '+'

    return `https://ui-avatars.com/api/?name=${formattedName}`;
  };

  return (
    <div className="">
      <Sideb></Sideb>
      <div className="wrapper w-4/6 mx-auto m-8 flex items-center justify-center">
        {post ? (
          <div>
            <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
              {post.title}
            </h3>

            {post.body && (
              <div className="prose  mx-auto text-gray-700 dark:text-gray-300">
                {HTMLReactParser(post.body)}
              </div>
            )}

            <Link
              to="/blogs"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-5"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-6a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"></path>
              </svg>
              Back to Posts
            </Link>

            {/* Comments Section */}
            <section className="bg-white  py-8 lg:py-16 antialiased rounded-lg">
              <div className="max-w-2xl  px-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
                    Comments ({comments.length})
                  </h2>
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="w-full border p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <button
                    onClick={handleCreateComment}
                    className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Post Comment
                  </button>
                </div>
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        className="w-6 h-6 mr-2 rounded-full"
                        src={generateAvatarUrl(comment.user)}
                        alt={comment.user}
                      />
                      <p className="text-sm text-gray-900 dark:text-white font-semibold">
                        {comment.user===user?"Me":comment.user}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {format(new Date(comment.createdAt), "eeee, MMM d, yyyy")}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="loader w-screen h-screen ml-[480px] mt-[300px] flex items-center justify-center"></div>
        )}
      </div>
    </div>
  );
};

export default Post;


