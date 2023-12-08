import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change,changeData } from "../Slices/replySlice";
export default function Card(props) {
  const value = useSelector((state) => state.reply.value);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const message = props.data;
  const user = props.user;
  let time = message.time
    .split("T")[1]
    .substr(0, message.time.split(":")[0].length - 5);
  let d = message.time.split("T")[0];

  const data = {
    name : message.name,
    message : message.message,
    time:message.time,
    id:1
  }

  const handleReply =async () =>{ 
    if(value === false)
      {
        const response = await fetch(`http://localhost:4000/findMessage`,{
       method:'POST',
       body:JSON.stringify({
         data:data
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data1 = await response.json();
      console.log("############################################")
      // console.log(data);
      data.id = data1.data._id;
      // console.log(data);
        dispatch(change());
        dispatch(changeData(data));
      
      }};

  // console.log(data)
  return (
      <div className="flex flex-row gap-4 hover:bg-gray-50 hover:duration-150 rounded-lg  h-[100px] p-4 group relative mr-6">
        <div className="w-[45px] h-[45px]">
          <img src={message.url} alt="img" className="rounded-lg"></img>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-row gap-4 justify-start items-baseline">
            {message.name === user && (
              <div className="font-bold text-lg text-teal-950">Me</div>
            )}
            {message.name !== user && (
              <div className="font-bold text-lg text-teal-950">
                {message.name}
              </div>
            )}
            <span className="font-normal opacity-50 text-sm">{d}</span>
          </div>
          <div className="text-lg opacity-70">{message.message}</div>
        </div>
        <div className=" opacity-0 group group-hover:opacity-100 top-4 -right-0 absolute group-hover:duration-150 h-[45px] w-[45px] cursor-pointer"
                  onClick={handleReply}
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white hover:scale-110 hover:duration-150 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12.5 4.046H9V2.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49C8.1 12.5 9 11.971 9 11.051V9.123h2a3.023 3.023 0 0 1 3 3.046V15a5.593 5.593 0 0 0-1.5-10.954Z"
            />
          </svg>
        </div>
      </div>
  );
}
