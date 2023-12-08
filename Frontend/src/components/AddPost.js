import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import HTMLReactParser from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddPost = () => {
  const navigator = useNavigate();

  const editor = useRef(null);

  const [post, setPost] = useState({
    title: "",
    body: "",
    // categoryId: ''
  });

  const token = localStorage.getItem("token");
  let name = null;
  // let autorName = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    name = decodedToken.name;
  }

  //field changed function
  const fieldChanged = (event) => {
    console.log(event);
    console.log("body : ", post.body);
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleCreatePost = (event) => {
    //data to be sent to the server

    event.preventDefault();

    // console.log(post)
    if (post.title.trim() === "") {
      toast.error("post title is required !!");
      return;
    }

    if (post.body === "") {
      console.log("Post content : ", post.body);
      toast.error("post content is required !!");
      return;
    }

    const { title, body } = post;

    // Prepare the data to send to the server
    const data = { title, body, createdBy: name };

    console.log("title : ", title);
    console.log("content : ", post.body);

    fetch("http://localhost:4000/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        if (response.ok) {
          toast.success("Blog created successfully");
          navigator("/blogs");
        }
        response.json();
      })
      .then((response) => {
        // Handle the response from the server, e.g., show a success message
        console.log("Post created:", response);
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error("Error creating post:", error);
      });
  };

  const handleResetContent = (e) => {
    e.preventDefault();
    // Reset the content field to an empty string

    setPost({
      title: "",
      body: "",
    });
  };

  return (
    <div className="wrapper w-2/4 mx-auto ">
      <div className="shadow-sm  border-0 mt-2">
        <div className="flex flex-col justify-center">
          {/* {JSON.stringify(post)} */}
          <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
            Create a Blog Post
          </h3>
          <form
            onSubmit={(event) => {
              handleCreatePost(event);
            }}
          >
            <div className="my-3 flex flex-col ">
              <label
                htmlFor="title"
                className="block text-gray-600 text-md font-semibold mb-2"
              >
                Post title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter here"
                name="title"
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="body"
                className="block text-gray-600 text-md font-semibold mb-2"
              >
                Post Content
              </label>

              <JoditEditor
                ref={editor}
                value={post.body}
                className="w-full  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                onChange={(newContent) =>
                  setPost({ ...post, body: newContent })
                }
              />
            </div>

            <div className="text-center flex flex-row gap-5 my-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                color="primary"
              >
                Create Post
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                color="danger"
                onClick={(event) => {
                  handleResetContent(event);
                }}
              >
                Reset Content
              </button>
            </div>
          </form>

          {/* <div>{HTMLReactParser(post.body)}</div> */}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
