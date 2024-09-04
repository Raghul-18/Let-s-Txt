"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


function Navbar() {
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <div className="flex fixed justify-between items-center px-5 lg:px-36 w-screen h-[100px] bg-white">
      <Image src="/images/logo.png" alt="logo" height={60} width={80} />
      <div className="hidden gap-10 font-medium lg:flex">

      </div>
      <div
        className="flex gap-10 font-medium cursor-pointer lg:hidden"
        onClick={() => setNavbarActive((prev) => !prev)}
      >
        {navbarActive ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>
      {navbarActive && (
        <div className="text-white absolute top-[80px] bg-gradient-to-r from-purple-500 to-pink-500 right-6 rounded-full font-medium text-xl pt-2 px-4">
        </div>
      )}
    </div>
  );
}

export default Navbar;
