import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import axios from "axios";
import ProfilePosts from "../Components/ProfilePosts";

const MyPosts = () => {
  const param = useParams().id;
  const [userPost, setUserPost] = useState([]);
  const { user, loading, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (!loading && user) {
      fetchUserPost();
    }
  }, [loading, user]);

  const fetchUserPost = async () => {
    try {
      if (!user || !user._id) {
        throw new Error("User ID is not available");
      }
      console.log("Fetching posts for user with ID:", user._id);
      const res = await axios.get(process.env.url`/api/v1/posts/user/${user._id}`, {
        withCredentials: true,
      });
      setUserPost(res.data.posts);
      // console.log(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 md:px-[200px]">
      <h1 className="text-xl font-bold mb-4 mt-4">Your posts:</h1>
      {userPost && userPost.length > 0 ? (
        userPost
          .slice()
          .reverse()
          .map((post) => (
            <Link key={post._id} to={`/posts/post/${post._id}`}>
              <ProfilePosts post={post} />
            </Link>
          ))
      ) : (
        <p className="text-gray-500 text-center">No posts found</p>
      )}
    </div>
  );
};

export default MyPosts;
