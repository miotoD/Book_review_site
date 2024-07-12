// "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function SecNavbar({ onLogout }) {
  return (
    <div className="navbar bg-black w-full h-[50px] flex text-white">
      <ul className="flex w-full justify-center gap-11 items-center">
        <li className="hover:cursor-pointer font-semibold transform transition duration-300 hover:scale-105">
          <Link href="/"> Home</Link>
        </li>
        <li className="hover:cursor-pointer font-semibold transform transition duration-300 hover:scale-105">
          <Link href="/Browse">Browse</Link>
        </li>
        <li className="hover:cursor-pointer font-semibold transform transition duration-300 hover:scale-105">
          <Link href="/contact">Contact Us</Link>
        </li>
        <li
          className="hover:cursor-pointer w-[70px] bg-[#00BCD4] font-semibold font-sans p-2 rounded-lg transform transition duration-300 hover:scale-105 px-2 py-1 text-white h-[35px]"
          onClick={() => {
            onLogout();
          }}
        >
          LogOut
        </li>
        <li className="hover:cursor-pointer font-semibold transform transition duration-300 hover:scale-105 ">
          <Link href="/users">Profile</Link>
        </li>

        <li className="hover:cursor-pointer font-semibold transform transition duration-300 hover:scale-105 "></li>
      </ul>
    </div>
  );
}

export default SecNavbar;
