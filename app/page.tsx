"use client";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SecNavbar from "./components/navbar/secNavbar";
import { useEffect, useState } from "react";
import secNavbar from "./components/navbar/secNavbar";
import Login from "./Login/page";
import Link from "next/link";

export default function Home() {
  let [access, setAccess] = useState(false);
  let [username, setUsername] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccess(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    setAccess(false);
  }

  return (
    <>
      {access ? <SecNavbar onLogout={handleLogout} /> : <Navbar />}
      <div className="header relative border-[2px] border-black w-full h-[450px] hover:bg-black bg-[url('/cover.jpg')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold ml-[-200px]">
            Explore the Books You Love
          </h1>

          <button className="bt mt-[100px] ml-[-300px] text-white bg-gray-800 w-[100px] hover:bg-black font-semibold">
            {" "}
            <Link href="/Browse">Explore</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
