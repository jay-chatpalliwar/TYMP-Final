import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeData } from "../Slices/nameSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("{}");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // login
    console.log("Email:", email);
    console.log("Password:", password);
    try{
      const loadToast = toast.loading("Hang Up! Logging you in");
       const response = await fetch("http://localhost:4000/login",{
        method:'POST',
        body:JSON.stringify({
          email:email,
          password:password,
        }),
        headers:{
          'Content-type': 'application/json; charset=UTF-8'       }
       })
       
       const data = await response.json();
       console.log(data);
      
       setTimeout(() => {
         toast.dismiss(loadToast)
       }, 1000);
       
       
       if(response.ok)
       { 
         const token = data.token;
         console.log(data.user.name);
         const name = data.user.name;
         dispatch(changeData(name))
         localStorage.setItem('token',token);
         localStorage.setItem('email',data.user.email)
         localStorage.setItem('name',data.user.name)
       
          toast.success("Login Successful")
          setTimeout(()=>{},3000);
          navigate('/profile');
       }
       else
       {
       setTimeout(()=>{toast.error(data.message)},1000);
       
       }
     }
     catch(e)
     {
       console.log("error at login - "+e);
     }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <form
        className="bg-white rounded-lg p-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-5">
          Don't have account ?
          <Link to="/signup" className="text-blue-500 ml-2">
            SignUp here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;








