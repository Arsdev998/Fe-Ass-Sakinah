import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/api/authApi";
import { toast } from "sonner";

const RightHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLogout ,authLoading} = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (isLogout) {
      toast.success("Berhasil logout")
       localStorage.removeItem("login")
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
      <div className="">
        {isAuth ? (
          <Button onClick={handleLogout} disabled={authLoading}>Logout</Button>
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
