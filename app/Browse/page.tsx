"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import axios from "axios";
import SecNavbar from "../components/navbar/secNavbar";
import { useRouter } from "next/navigation";
import detailpage from "../detailpage/page";
import Detailpage from "../detailpage/page";
import Link from "next/link";

function Browse() {
  let [access, setAccess] = useState(false);
  let [search, setSearch] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccess(true);
    }
  }, []);

  let [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/browse").then((resp) => {
      console.log("fetched data:", resp.data);
      setData(resp.data);
    });
  }, []);

  let router = useRouter();

  function displayPage() {
    if (!access) {
      alert("Login required!!");
    }
  }

  {
    console.log("Searching for:", search);
  }

  return (
    <>
      {access ? <SecNavbar /> : <Navbar />}
      <div className="middle bg-black h-[150px] w-full flex justify-center items-center">
        <h1 className=" font-semibold text-white mt-[-10px] text-[30px]">
          Search and Browse Books
        </h1>
        <input
          type="text"
          className="search h-[30px] w-[300px] ml-[-340px] mt-[100px] "
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button className=" mt-[100px] ml-3 text-white text-[16px] bg-[#00BCD4] rounded-lg hover:bg-[#79deeb] w-[60px] hover:text-black">
          {" "}
          Search
        </button>
      </div>

      <div className=" mid h-[400px] py-1">
        <div className=" bg-[url('/ad.jpg')] bg-contain bg-center h-[120px]"></div>
        <div className=" bg-white h-[40px] w-full ">
          <h1 className=" flex text-black font-bold justify-center text-[22px] ">
            Discover something new to read{" "}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {data.map((item) => (
            <div key={item.id} className="max-w-sm w-full lg:w-1/3 p-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:cursor-pointer hover:bg-slate-400">
                {access ? (
                  <Link href={`/Browse/${item.id}`}>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2">
                        {item.BookName}
                      </h2>
                      <p className="text-gray-700 mb-2">
                        <strong>Author:</strong> {item.Author}
                      </p>
                      <p className="text-gray-700">
                        <strong>Genre:</strong> {item.Genre}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6" onClick={displayPage}>
                    <h2 className="text-xl font-bold mb-2">{item.BookName}</h2>
                    <p className="text-gray-700 mb-2">
                      <strong>Author:</strong> {item.Author}
                    </p>
                    <p className="text-gray-700">
                      <strong>Genre:</strong> {item.Genre}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Browse;
