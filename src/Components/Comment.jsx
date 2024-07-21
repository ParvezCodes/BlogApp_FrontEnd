import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../Context/userContext";
import axios from "axios";
import { url } from "../main";
import toast from "react-hot-toast";

const Comment = ({ comment }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async () => {
    try {
      const res = await axios.delete(`${url}/api/v1/comment/${comment._id}`);
      // console.log(res.data.msg);
      window.location.reload();
      toast.error(res.data.msg);
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
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{comment.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{formatDate(new Date(comment.createdAt))}</p>
          <p>{formatTime(new Date(comment.createdAt))}</p>
          <div className="flex justify-center items-center space-x-2">
            {user?._id === comment?.userId ? (
              <>
                <MdDelete onClick={deleteComment} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <p className="px-4 mt-2">{comment.comment}</p>
    </div>
  );
};

export default Comment;
