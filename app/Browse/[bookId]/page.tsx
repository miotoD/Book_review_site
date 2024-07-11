"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

function page({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const [book, setBook] = useState(null);
  const [comment, setComment] = useState(""); //for input comment. later this comment will be stored in comments array.
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : [];
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/browse/${params.bookId}`)
      .then((resp) => {
        setBook(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  console.log("The book data now is:", book);

  if (!book) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const router = useRouter();

  console.log(" the comment is:", comments);

  function uploadComments() {
    setComments([...comments, comment]);
    setComment("");
    console.log(" the comment list isL:", comments);
  }

  return (
    <div>
      <button
        className=" ml-4 mt-4 w-11 bg-black text-white rounded-md"
        onClick={() => {
          router.push("/Browse");
        }}
      >
        {" "}
        Back
      </button>
      <h1 className=" font-bold text-4xl text-center"> {book.BookName} </h1>
      <p className=" text-center font-bold py-2">
        A {book.Genre} written by {book.Author}
      </p>
      <div className=" border-black border-[2px] rounded-md h-fit w-full p-6 font-semibold">
        {book.Body}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
        consequuntur illum, soluta, amet unde possimus laudantium ipsam
        doloremque minima, obcaecati impedit eum! Ipsam aperiam facere
        distinctio soluta nam commodi corporis.
      </div>
      <div className=" flex justify-center mt-2 gap-3">
        <button className=" bg-blue-400 border-[1px] border-black rounded-md w-16 font-bold hover:text-white hover:bg-blue-500 ">
          Upvote
        </button>
        <button className=" bg-red-300 border-[1px] border-black rounded-md w-24 font-bold hover:text-white hover:bg-red-500 ">
          Downvote
        </button>
      </div>{" "}
      <h1 className=" ml-8 font-semibold text-2xl mt-8">Comments</h1>
      <div className="  w-full h-48 border-[2px] rounded-lg">
        <h1 className=" ml-8 font-semibold pt-4">Add a Comment</h1>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className=" w-[410px] ml-8 text-black text-ellipsis font-semibold text-sm border-b-2 border-black bg-transparent outline-none "
        />
        <button
          className=" ml-2 bg-green-400 rounded-lg w-16 hover:bg-green-600 font-semibold"
          onClick={uploadComments}
        >
          Post{" "}
        </button>
        <div className="mt-8 ml-7">
          <ul className=" bg-gray-400 w-fit">
            {comments.map((comments, index) => (
              <li
                key={index}
                className=" m-4 p-4 bg-white border-gray-300 rounded-lg font-semibold text-center"
              >
                {comments}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
