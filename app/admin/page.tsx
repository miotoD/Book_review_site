"use client";
import React, { useState } from "react";
import SecNavbar from "../components/navbar/secNavbar";
import axios from "axios";
import { error } from "console";
import { useEffect } from "react";
import PrimaryNavbar from "../components/navbar/Navbar";
import { useRouter } from "next/navigation";
import AdminNav from "../components/navbar/adminNav";

function page() {
  let router = useRouter();

  let [BookName, setBookName] = useState("");
  let [Author, setAuthor] = useState("");
  let [Genre, setGenre] = useState("");
  let [Body, setBody] = useState("");

  let [access, setAccess] = useState(false);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccess(true);
    } else {
      router.push("/Login");
    }
  });

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccess(true);
    }
  });

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    setAccess(false);
    router.push("/");
  }

  let Bookdata = {
    BookName,
    Author,
    Genre,
    Body,
  };

  const URL = "http://localhost:5000/browse/post";

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    axios
      .post(URL, Bookdata)
      .then((resp) => {
        alert("Succesflly uploaded.");
        console.log("Succesfully updated");
      })
      .catch((error) => {
        alert("Error uploading!");
        console.log(error);
      });

    setBookName("");
    setAuthor("");
    setGenre("");
    setBody("");
  }
  return (
    <>
      {/* {access ? <SecNavbar onLogout={handleLogout} /> : <PrimaryNavbar />} */}
      {access ? <AdminNav /> : <PrimaryNavbar />}

      <div className="container mx-auto p-4">
        <h1 className=" text-center mb-9 mt-4 font-bold text-3xl">
          Welcome Admin!
        </h1>
        <h1 className="text-2xl font-bold mb-4 text-center">Upload A Book</h1>
        <form className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              BookName
            </h1>
            <input
              id="BookName"
              name="BookName"
              type="text"
              value={BookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="BookName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </h1>
            <input
              id="Author"
              name="Author"
              type="Author"
              value={Author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Genre
            </h1>
            <input
              id="Genre"
              name="Genre"
              type="Genre"
              value={Genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Genre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <h1 className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </h1>
            <input
              id="Body"
              name="Body"
              type="Body"
              value={Body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="content goes here"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleUpload}
          >
            Upload Book
          </button>
        </form>
      </div>
    </>
  );
}

export default page;
