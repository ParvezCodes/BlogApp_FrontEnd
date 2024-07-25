import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const param = useParams().id;
  console.log("Profile param:", param);

  const { user, loading, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    if (!loading && user) {
      getUser();
      fetchUserPost();
    }
  }, [loading, user]);

  const getUser = async () => {
    try {
      if (!user || !user._id) {
        throw new Error("User ID is not available");
      }
      console.log("Fetching user with ID:", user.id);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/user/${user._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setPassword(""); // Clear the password field for security
    } catch (error) {
      console.log(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUserUpdate = async () => {
    try {
      const updateData = { username, email };
      if (password) {
        updateData.password = password;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_APP_URL}/api/v1/user/${user._id}`,
        updateData,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors.map((err) => err.msg));
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/api/v1/user/${user._id}`,
        {
          withCredentials: true,
        }
      );
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserPost = async () => {
    try {
      if (!user || !user._id) {
        throw new Error("User ID is not available");
      }
      console.log("Fetching posts for user with ID:", user._id);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/posts/user/${user._id}`,
        {
          withCredentials: true,
        }
      );
      setUserPost(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || profileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-[80vh]">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <input
        className="outline-none px-4 py-2 text-gray-500 border-2 border-gray-300 w-full sm:w-3/4 md:w-2/5   mb-2 focus:border-gray-900 focus:ring-gray-900 rounded"
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="outline-none px-4 py-2 text-gray-500 border-2 border-gray-300 w-full sm:w-3/4 md:w-2/5  mb-2 focus:border-gray-900 focus:ring-gray-900 rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="outline-none px-4 py-2 text-gray-500 border-2 border-gray-300 w-full sm:w-3/4 md:w-2/5 mb-2 focus:border-gray-900 focus:ring-gray-900 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4 mt-4 w-full sm:w-3/4 md:w-2/5 ">
        <button
          className="text-white font-semibold rounded bg-black px-4 py-2 hover:text-black hover:bg-gray-400 w-full"
          onClick={handleUserUpdate}
        >
          Update
        </button>
        <button
          className="text-white font-semibold rounded bg-black px-4 py-2 hover:text-black hover:bg-gray-400 w-full"
          onClick={handleUserDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Profile;
