import { useState, useEffect } from "react";
import Message from "./message";
import Text from "./text";
import { useSelector, useDispatch } from "react-redux";
import { change } from "../Slices/replySlice";
import HTMLReactParser from "html-react-parser";
import striptags from "striptags";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import Sideb from "./Sideb";
// import Reply from "./reply";
import "./Loader.css";


export default function Reply(){
    const value = useSelector((state) => state.reply.value);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.reply.data);
    return (
            <div className=" absolute z-40 -top-3 right-0 h-[85%] flex flex-col justify-center items-center">
    
            <div className="cursor-pointer -mr-60"
              onClick={() => dispatch(change())}
              
              >
              <svg xmlns="http://www.w3.org/2000/svg" className="scale-50" width="96" height="96" id="cross"><switch><g><path d="m53.657 48 25.171-25.172a4 4 0 1 0-5.656-5.656L48 42.343 22.829 17.172a4 4 0 0 0-5.657 5.656L42.344 48 17.172 73.172a4 4 0 1 0 5.657 5.656L48 53.657l25.172 25.171C73.953 79.609 74.977 80 76 80s2.048-.391 2.828-1.172a4 4 0 0 0 0-5.656L53.657 48z"></path></g></switch></svg> 
              {/* {value.payload} */}
            
            </div>
            <div>{data.payload.name}</div>
            <div>{data.payload.message}</div>
            {/* <div className="overflow-auto ">
            <section className="bg-white -mt-14 lg:py-16 antialiased rounded-lg">
                  <div className="max-w-2xl  px-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
                        Replies ({comments.length})
                      </h2>
                    </div>
                    <div className="w-full h-300px flex flex-col gap-4 mb-4">
                      <div className="text-3xl font-bold ">
                        {data.payload.message}
                      </div>
                      <div className="w-full flex flex-row gap-2 items-center justify-end px-4">
                        <img src={url} className="h-[35px] w-[35px] rounded-full"></img>
                        {data.payload.name}
                      </div>
                    </div>
                    <div className="mb-4">
                      <textarea
                        placeholder="Add a reply..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="w-full border p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                      <button
                        onClick={handleCreateComment}
                        className="bg-blue-500 text-white p-2 w-[200px] rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Post Reply
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
            </div> */}
            </div>
    )
}