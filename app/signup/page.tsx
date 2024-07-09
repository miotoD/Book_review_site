"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { error } from "console";

function Signup() {
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let URL = "http://localhost:5000/api/auth/signup";

  const userdata = {
    userName,
    email,
    password,
  };

  console.log("The data is:", userdata);

  let handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    let response = axios
      .post(URL, userdata)
      .then((resp) => {
        alert("User registered successfully!");

        setUserName("");
        setEmail("");
        setPassword("");

        if (resp.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(resp.data));
        }
      })
      .catch((error) => {
        console.error("There was an error registering the user!", error);
      });
  };
  return (
    <>
      <Navbar />
      <div className=" main 500 h-[100%] flex">
        <div className="relative w-[50%] h-screen">
          <img
            src="/bk.png"
            alt="books"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
              Find Books You Love
            </h1>
          </div>
        </div>

        <div className=" form flex border-[2px] w-[50%] justify-center items-center">
          <h1 className="signupB mt-[-500px] ml-[30%] font-bold bg-black text-white w-[90px] px-4 rounded-lg">
            SignUp{" "}
          </h1>
          <form className=" ml-[-36%]">
            <div className="mb-4 w-[400px]">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 justify-center ml-[150px]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 border-[3px w-[400px]">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 justify-center ml-[150px]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4 border-[3px w-[400px]">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 justify-center ml-[150px]"
                htmlFor="email"
              >
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Set Your Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              className=" bg-blue-500 w-[100px] hover:bg-blue-800 text-white rounded-lg ml-[130px]"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
