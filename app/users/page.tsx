"use client";

import React, { useEffect, useState } from "react";
import SecNavbar from "../components/navbar/secNavbar";
import { useRouter } from "next/navigation";

function Profilepage() {
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    let accesstoken = localStorage.getItem("accessToken");
    if (!accesstoken) {
      router.push("/login");
    }
  }, [router]);
  return (
    <>
      <SecNavbar />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Profile</h1>
        <form className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </h1>
            <input
              id="username"
              name="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </h1>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </h1>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}

export default Profilepage;
