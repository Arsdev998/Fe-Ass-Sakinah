import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/api/authApi";
import { toast } from "sonner";
import { authReset } from "@/redux/slice/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const RightHeader = () => {
  const dispatch = useDispatch();
  const { isAuth, isLogout, authLoading, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (isLogout) {
      toast.success("Berhasil logout");
      localStorage.removeItem("login");
      dispatch(authReset());
    }
  }, [isLogout]);

  return (
    <div className="flex space-x-4 items-center">
      <div className="flex items-center bg-white px-2 rounded-full w-[400px]">
        <IoSearch />
        <input
          placeholder="Cari produk"
          className="text-black w-full bg-transparent outline-0 border-none p-2"
        />
      </div>
      <div>
        {isAuth ? (
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <FaShoppingCart className="text-xl" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon">
                  <FaRegUserCircle className="text-2xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="p-2">
                  <p className="text-md font-semibold">{user.username}</p>
                  <Link to={"/order"} className="text-md font-semibold">
                    Lihat Order
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full mt-2"
                  >
                    Logout
                    <FiLogOut className="ml-1" />
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RightHeader;
