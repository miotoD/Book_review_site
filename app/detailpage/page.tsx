"use client";

import React, { useState } from "react";
import secNavbar from "../components/navbar/secNavbar";
import PrimaryNavbar from "../components/navbar/Navbar";
import { useEffect } from "react";

function Detailpage() {
  const [access, setAccess] = useState(false);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccess(true);
    }
  }, []);

  return (
    <>
      <h1></h1>
    </>
  );
}

export default Detailpage;
