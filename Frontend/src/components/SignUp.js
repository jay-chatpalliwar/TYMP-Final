// SignupPage.js
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {changeData} from '../Slices/nameSlice'
// import axios from "axios";

const SignUp = () => {
  const history = useNavigate();
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("role");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  signup
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Role:", role);

    if (password !== confirmPassword) {
      toast.error("Passwords not matching...");
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      dispatch(changeData(name));
      if (response.status===200) {
        history(`/login`, { state: { id: email } });
        toast.success("User created successfully");
      } else {
        toast.error("Something went wrong");
        console.log(response.message);
        console.log(response);
      }
      // .then((res) => {
      //   console.log(res);
      //   if (res.status === 200) {
      //     history(`/${res.data.role}/dashboard`, { state: { id: email } });
      //     toast.success("User created successfully");
      //   } else if (res.status === 500) {
      //     // alert("User have not sign up")

      //     toast.error("Something went wrong");
      //     console.log(res.message);
      //     console.log(res);
      //   } else if (res.status === 400) {
      //     toast.error("User already exist");
      //   }
      // })
      // .catch((e) => {
      //   toast.error("wrong details");
      //   console.log("error : ", e.message);
      // });

      // const data = await response.json();
      // console.log(data);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen h-screen bg-gradient-to-r bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded border focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded border focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded border focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded border focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded border focus:outline-none"
            >
              <option value="role" disabled>
                Role
              </option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Signup
          </button>

          <p className="mt-5">
            Already registered ?
            <Link to="/login" className="text-blue-500 ml-2">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
