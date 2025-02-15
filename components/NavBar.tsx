"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const links = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "Upcoming",
      link: "/upcoming",
    },
    {
      name: "Now Showing",
      link: "/now-showing",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Login/Register",
      link: "/login",
    },
  ];
  return (
    <div className="navbar p-4 top-0 w-full h-16 z-50 sticky text-gray-100 flex items-center justify-between">
      <div>
        <Link href={"/"}>M$M</Link>
      </div>
      <div className="flex justify-around">
        {links.map((link) => (
          <div className="m-3 font-sans ">
            <Link href={link.link}>{link.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
