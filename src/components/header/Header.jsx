import React from "react";
import logo from "@/assets/img/logo.png";
import Navbar from "./Navbar";
import RightHeader from "./RightHeader";

const Header = () => {
  return (
    <header className="w-full flex justify-around items-center p-4 md:p-6 bg-slate-200">
      <div className="flex items-center space-x-7">
        <div className="flex items-center gap-x-1">
          <img src={logo} alt="logo" />
          <h1 className="text-3xl font-extrabold font-mono">As-Sakinah</h1>
        </div>
        <Navbar />
      </div>
        <RightHeader/>
    </header>
  );
};

export default Header;
