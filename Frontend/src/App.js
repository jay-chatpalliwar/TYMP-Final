import './App.css';
import Menu from './components/menu'
import Forum from './components/forum'
import Dashboard  from './components/dashboard'
import Sideb from './components/Sideb'
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Piechart from "./components/Piechart";
import Blogs from './components/Blogs';
import Post from './components/Post';
import AddPost from './components/AddPost';
import Contact from './components/ContactUs'
// import Navbar from "./components/Navbar";
// import Profile from './pages/Profile'
// import Resource from './pages/Resource'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
// import EmojiPicker from 'emoji-picker-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { LogIn } from 'lucide-react';
import {useEffect, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import Resource from "./components/Resource";
import Profile from "./components/Profile";

function App() {

  const [val,setVal] = useState("ml-52");
  const location = useLocation();
  const data = useSelector((state) => state.name.name);
  // console.log("name is ",data);
  // console.log(location.pathname);
  useEffect(() =>{

    if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")
    setVal("");
  
  else
  setVal("ml-52")

  console.log("useEffect")
  console.log(location.pathname)
  console.log(val)
},[location.pathname])
  
const name = localStorage.getItem('name');
console.log("From doubt forum :",name);
const user = name;
  return (
    <div className={`flex ${val} flex-row gap-1 relative overflow-y-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300`}>
      {location.pathname === "/dashboard" &&
      <Sideb/>}  
      {location.pathname === "/doubtforum" &&
      <Sideb/>}  
      {location.pathname === "/blogs" &&
      <Sideb/>}  
      {location.pathname === "/blogs/create" &&
      <Sideb/>}  
      {location.pathname === "/blogs/:postId" &&
      <Sideb/>}  
      {location.pathname === "/contactus" &&
      <Sideb/>}  
    <Routes>
    <Route path="/">
          {/* <Route index element={<Home />} /> */}
          <Route path="doubtforum" element={<Forum user={user} />}/>
          <Route path="dashboard" element={<Dashboard user={user}/>} />

          <Route path="" element={<Home/>} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="login" element={<Login/>} />
          <Route path="piechart" element={<Piechart/>} />
          <Route path="resources" element={<Resource/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="/blogs/create" element={<AddPost />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:postId" element={<Post />} />
          <Route path="contactus" element={<Contact />} />

          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
    </Routes>
    <Toaster />
    </div>
  );
}
export default App;
