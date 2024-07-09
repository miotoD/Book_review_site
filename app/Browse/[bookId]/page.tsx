"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const [book, setBook] = useState(null);
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

  console.log("The book data now is:", book);

  if (!book) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const router = useRouter();

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
    </div>
  );
}

export default page;
