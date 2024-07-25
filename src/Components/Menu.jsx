import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import axios from "axios";
import Loader from "./Loader";

const Menu = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-black w-[200px] flex flex-col items-start absolute top-24 right-2 rounded-md p-4 space-y-4 cursor-pointer md:right-32 md:top-12 z-10">
      {!user && (
        <div className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link
            to="/login"
            className="text-white text-sm hover:text-gray-500 cursor-pointer"
          >
            Login
          </Link>
        </div>
      )}
      {!user && (
        <div className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </div>
      )}
      {user && (
        <>
          <div className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </div>
          <div className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/write">Write</Link>
          </div>
          <div className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to={`/myposts/${user._id}`}>My Blogs</Link>
          </div>
          <div
            onClick={handleLogout}
            className="text-white text-sm hover:text-gray-500 cursor-pointer"
          >
            Logout
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
