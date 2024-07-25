import React, { useContext, useEffect, useState } from "react";
import Comment from "../Components/Comment";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/userContext";
import toast from "react-hot-toast";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const postId = useParams().id;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    const commentObj = {
      comment: comment,
      userId: user._id,
      author: user.username,
      postId: postId,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/v1/comment/create`,
        commentObj,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      setPost(res.data.post);
      // console.log(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/comment/postcomments/${postId}`,
        { withCredentials: true }
      );

      // console.log(res.data.comments);
      setComments(res.data.comments);
    } catch (error) {
      console.log("Comments Error : " + error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/api/v1/posts/delete/${postId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="px-8 md:px-[200px] mt-8">
      <div className="flex">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          {post.title}
        </h1>
      </div>

      <img
        src={post.photo}
        alt=""
        className="w-full mx-auto mt-8 border-gray-200 border rounded"
      />
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>@{post.username}</p>
        <div className="flex space-x-2 items-center">
          <p>{formatDate(new Date(post.createdAt))}</p>
          <p>{formatTime(new Date(post.createdAt))}</p>
          {user?._id === post?.userId && (
            <>
              <MdEditSquare
                onClick={() => {
                  navigate(`/edit/${postId}`);
                }}
              />
              <AiFillDelete onClick={handleDeletePost} />
            </>
          )}
        </div>
      </div>

      <p className="mx-auto mt-8">{post.desc}</p>
      {post.categories && post.categories.length > 0 && (
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories :</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories.map((c, i) => (
              <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                {c}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col mt-4">
        <h3 className="mt-6 mb-4 font-semibold">Comments :</h3>
        {comments.length > 0 ? (
          [...comments]
            .reverse()
            .map((comment) => <Comment key={comment._id} comment={comment} />)
        ) : (
          <p className="text-gray-500 text-center">
            {" "}
            No Comments , Be the first commenter!
          </p>
        )}
      </div>
      {/* write comment */}
      <div className="w-full flex flex-col my-4  md:flex-row">
        <input
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Write a comment"
          className="md:w-[80%] outline-none py-3 px-2 mt-4 mr-2 md:mt-0 border-b-2 text-gray-500 border-2 border-gray-300  focus:border-gray-900 focus:ring-gray-900 rounded"
        />
        <button
          className="dark:bg-gray-900 text-white text-sm md:w-[20%] mt-4 md:mt-0 py-3 rounded mr-2"
          onClick={handleComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
