import React from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
const location = useLocation();

const nav = [
  {
    name: "Home",
    path: "/",
    active: location.pathname === "/",
  },
  {
    name: "Product",
    path: "/product",
    active: location.pathname === "/product",
  },
  {
    name: "Category",
    path: "/",
    active: location.pathname === "/category",
  },
  {
    name: "About",
    path: "/",
    active: location.pathname === "/about",
  },
];
  return (
    <nav>
      <ul className="flex space-x-6 font-bold text-md">
        {nav.map((item) => {
          return (
            <li key={item.index} className={`hover:text-yellow-400 duration-200 transition-colors ${item.active ? "text-yellow-400" : ""}`}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
