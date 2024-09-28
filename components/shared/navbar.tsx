"use client";

import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { FiSun, FiMoon } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import ToggleTheme from "../navbar/toggle-theme";
import ToggleSearch from "../navbar/toggle-search";
import { navbarItems } from "@/constants";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="max-w-screen-2xl sticky top-0 z-[999] mx-auto w-full backdrop-blur-xl bg-black h-[4.5rem]">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-2 items-center">
            <Link
              className="flex text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white"
              href="/"
            >
              <p className="text-purple-500">HANABI</p>
            </Link>
          </div>

          <ul className="lg:flex gap-4 hidden">
            {navbarItems.map((item, index) => (
              <li key={item.name} className="flex gap-4 items-center">
                <Link href={item.href}>{item.name}</Link>
                <span
                  className={cn(
                    "text-muted-foreground",
                    index === 2 && "hidden"
                  )}
                >
                  {"/"}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center">
            <ToggleSearch />

            <ToggleTheme />

            <button className="ml-4 p-1 rounded-full text-gray-900 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none">
              <CgProfile className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
