import React, { useEffect, useState } from "react";

const HomePost = ({ post }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full flex mt-8 mb-4 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[220px] flex justify-center items-center ">
        <img
          className="w-full h-full object-cover"
          src={process.env.IF + post.photo}
          alt=""
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[66%] ">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{formatDate(new Date(post.createdAt))}</p>
            <p>{formatTime(new Date(post.createdAt))}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {isMobile
            ? post.desc.slice(0, 100) + " ...Read more"
            : post.desc.slice(0, 180) + " ...Read more"}
        </p>
      </div>
    </div>
  );
};

export default HomePost;
