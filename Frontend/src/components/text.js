import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { change } from "../Slices/updateSlice";
export default function Text(props) {
  const dispatch = useDispatch();
  const [message,setMessage] = useState("");
  const handleClick = async () => {

    var Text = document.getElementsByClassName("Text");
    Text[0].value = "";
    const obj = {
      name : props.user,
      message : message
    }

    // console.log(obj);
    const savedUserResponse = await fetch(
      "http://localhost:4000/addMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...obj}),
      }
    );

    dispatch(change());
    // console.log("FORM RESPONSE......", savedUserResponse);
  };
  return (
    <div className="absolute bottom-4 border-2 bg-gray-100 h-16 flex flex-row items-center min-w-[1100px] rounded-md right-4 left-0 m-1 px-8 overflow-hidden">
      <div>
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white font-bold gap-2 mr-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            fill="currentColor"
            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
          />
        </svg>
      </div>

      <div>
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
          />
        </svg>
      </div>

      <textarea
        className=" Text border-2 h-[75%] w-[90%] mx-4 rounded-md resize-none p-2 example"
        placeholder="Your message here"
        onChange = {(e) => setMessage(e.target.value)}
        ></textarea>

      <button onClick = {handleClick} onKey = {handleClick}>
        <svg
          class="w-6 h-6 dark:text-white rotate-90 text-blue-600 ml-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
      </button>
    </div>
  );
}
