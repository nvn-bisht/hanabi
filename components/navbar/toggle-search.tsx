"use client";

import { KeyboardEvent, useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { MenuContext } from "@/context/menu-provider";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IoIosSearch } from "react-icons/io";

const ToggleSearch = () => {
  //   const { toggleSearch, isSearchOpen, closeMenu, handleClick } =
  //     useContext(MenuContext);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleButton = () => {
    // handleClick();
    // return window.location.assign(`/search?keyword=${searchQuery}&page=1`);
  };

  const handleQuery = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //   handleClick();
      //   return window.location.assign(`/search?keyword=${searchQuery}&page=1`);
    }
  };

  const handleSearchOption = () => {
    // toggleSearch();
    // if (!isSearchOpen && searchRef) {
    //   closeMenu();
    //   return searchRef?.current?.focus();
    // }
  };

  //Temp value

  const isSearchOpen = false;

  return (
    <>
      <div className="hidden sm:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
        <div className="max-w-lg w-full lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoIosSearch
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>

            <Input
              type="search"
              placeholder="Search"
              className="pl-10  focus:outline-none bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full gap-x-4 dark:bg-black bg-slate-100 left-0 absolute -z-10 top-0 flex items-end px-4 duration-300 overflow-hidden",
          isSearchOpen ? "md:h-60 h-52 py-6" : "h-0"
        )}
      >
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <Input
            ref={searchRef}
            onKeyDown={(e) => handleQuery(e)}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Attack on titan"
          />
          <Button
            onClick={handleButton}
            disabled={!searchQuery}
            className="md:w-32 w-full"
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};
export default ToggleSearch;
