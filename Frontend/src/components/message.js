// import Card from "./card";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Text from "./text";
// // export default function Message(props) {
// //     const message = props.data;
// //     const user = props.user;
// //     return (
// //         <div className="flex flex-row gap-4 bg-gray-50 rounded-lg w- h-[100px]">
// //             <div className="w-[55px] h-[55px] rounded-">
// //                 <img src={message.url} alt='img'></img>
// //             </div>

// //             <div>
// //                 {message.name === user &&
// //                     <div>Me</div>
// //                 }
// //                 {
// //                     message.name !== user &&
// //                     <div>{message.name}</div>
// //                 }
// //                 <span>{message.time.split(':')[0]}</span>
// //                 <div>{message.message}</div>
// //             </div>

// //         </div>
// //     )
// // };

// export default function Message(props) {
//   const value = useSelector((state) => state.update.value)
//   const [data, setData] = useState([]);
//   const apiUrl = "http://localhost:4000/getMessages"; // Replace with your API endpoint
//   useEffect(() => {
//     async function getData() {
//       await fetch(apiUrl)
//         .then((res) => res.json())
//         .then((data) => setData(data.data));
//     }
//     getData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value]);
//   // console.log(data);

//   if (data === undefined) return null;
//   return (
//       <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 example mr-6 mb-20 ml-2 overscroll-contain w-full ">
//         {data.map((d) => (
//           <Card data={d} user = {props.user}></Card>
//         ))}
//       </div>
//   );
// }

import Card from "./card";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Text from "./text";
// export default function Message(props) {
//     const message = props.data;
//     const user = props.user;
//     return (
//         <div className="flex flex-row gap-4 bg-gray-50 rounded-lg w- h-[100px]">
//             <div className="w-[55px] h-[55px] rounded-">
//                 <img src={message.url} alt='img'></img>
//             </div>

//             <div>
//                 {message.name === user &&
//                     <div>Me</div>
//                 }
//                 {
//                     message.name !== user &&
//                     <div>{message.name}</div>
//                 }
//                 <span>{message.time.split(':')[0]}</span>
//                 <div>{message.message}</div>
//             </div>

//         </div>
//     )
// };

export default function Message(props) {
  const value = useSelector((state) => state.update.value)
  const [data, setData] = useState([]);
  const apiUrl = "http://localhost:4000/getMessages"; // Replace with your API endpoint
  useEffect(() => {
    async function getData() {
      await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setData(data.data));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  // console.log(data);

  if (data === undefined) return null;
  return (
      <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 example mr-6 mb-20 ml-2 overscroll-contain w-full ">
        {data.map((d) => (
          <Card data={d} user = {props.user}></Card>
        ))}
      </div>
  );
}
