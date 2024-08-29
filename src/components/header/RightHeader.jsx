import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const RightHeader = () => {
  return (
    <div className="flex space-x-4 items-center">
      <div className="flex items-center bg-white px-2 rounded-full w-[400px]">
        <IoSearch />
        <input
          placeholder="Cari produk"
          className="text-black bg-transparent outline-0 border-none p-2"
        />
      </div>
      <div className="">
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default RightHeader;
