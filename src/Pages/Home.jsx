import React, { useEffect, useState } from "react";
import HomePost from "../Components/HomePost";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 7;
  const { user } = useContext(UserContext);
  const { search } = useLocation();

  useEffect(() => {
    fetchPosts();
  }, [search, currentPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(process.env.url`/api/v1/posts`, {
        params: {
          page: currentPage,
          limit: postsPerPage,
          ...Object.fromEntries(new URLSearchParams(search)), // Include search params
        },
        withCredentials: true,
      });
      setPosts(res.data.posts);
      setTotalPosts(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 md:px-[200px]">
      {posts.length > 0 ? (
        <>
          {[...posts].map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <HomePost post={post} />
            </Link>
          ))}
          <div className="flex justify-between items-center my-4">
            <button
              className="px-4 py-2 rounded dark:bg-gray-900 text-white hover:text-black hover:bg-gray-400 flex items-center gap-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <GrLinkPrevious />
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded dark:bg-gray-900 text-white hover:text-black hover:bg-gray-400 flex items-center gap-1"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next <GrLinkNext />
            </button>
          </div>
        </>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Home;
