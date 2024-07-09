"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import axios, { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import SecNavbar from "../components/navbar/secNavbar";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter(); // Moved inside the component

  //using useref to automatically focus on input field
  const input = useRef<HTMLButtonElement>(null);

  //automatically focus on input field when component first renders
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  const URL = "http://localhost:5000/api/auth/signin";

  const loginCredentials = {
    userName,
    password,
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, loginCredentials);
      console.log("tokens:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUserName("");
      setPassword("");
      router.push("/"); // Navigate to the Home page
    } catch (error) {
      console.error("There was an error logging in!", error);
    }

    //admin login
    if (userName === "admin" && password === "admin") {
      router.push("/admin"); // Navigate to the admin page
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="main 500 h-[100%] flex">
        <div className="relative w-[50%] h-screen">
          <img
            src="/bk.png"
            alt="books"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
              {props.comp}
            </h1>
          </div>
        </div>

        <div className="form flex border-[2px] w-[50%] justify-center items-center">
          <h1 className="signupB mt-[-500px] ml-[8%] font-bold bg-black text-white w-[220px] px-4 rounded-lg">
            Login To Your Account
          </h1>
          <form className="ml-[-50%]" onSubmit={handleLogin}>
            <div className="mb-4 border-[3px w-[400px]">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 justify-center ml-[150px]"
                htmlFor="userName"
              >
                Username
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                ref={input}
                placeholder="Your username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 border-[3px w-[400px]">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 justify-center ml-[150px]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set Your Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              className="bg-blue-500 w-[100px] hover:bg-blue-800 text-white rounded-lg ml-[130px]"
              type="submit"
            >
              LogIn
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
