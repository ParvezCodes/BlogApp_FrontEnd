import axios from "axios";
import { useContext, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { UserContext } from "../Context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Remove 1 item from index i
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile); // Ensure key matches backend

    try {
      // Upload image to Cloudinary
      const imgUpload = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Create post data with image URL from Cloudinary
      const post = {
        title,
        desc,
        username: user.username,
        userId: user._id,
        categories: cats,
        photo: imgUpload.data.data, // Use the URL returned by Cloudinary
      };

      // Post creation
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/posts/create`, post, {
        withCredentials: true,
      });
      toast.success(res.data.msg);
      navigate("/");
    } catch (error) {
      console.error("Error during image upload or post creation:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.errors
      ) {
        const errorMessages = Object.values(
          error.response.data.error.errors
        ).map((err) => err.message);
        setErrors(errorMessages);
      } else {
        setErrors(["An unexpected error occurred"]);
      }

      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="px-4 md:px-[200px] mt-8">
      <h1 className="font-bold md:text-2xl text-xl text-center">Create Post</h1>
      <form className="w-full flex flex-col mt-4" onSubmit={createPost}>
        <input
          type="text"
          placeholder="Post Title"
          className="px-4 py-3 outline-none border-b-2 text-gray-500 border-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="flex flex-col mt-4">
          <input
            type="file"
            id="file"
            name="file"
            className="opacity-0 h-1 md:w-[20%]"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            required
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-gray-900 text-white px-4 py-2 rounded text-center mb-2 md:w-[25%] hover:text-black hover:bg-gray-400"
          >
            {selectedFile ? selectedFile.name : "Add Photo"}
          </label>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input
              type="text"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              placeholder="Post Category"
              className="px-4 py-3 outline-none text-gray-500 border-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded transition"
            />
            <div
              onClick={addCategory}
              className="dark:bg-gray-900 text-white px-4 py-2 font-semibold cursor-pointer rounded hover:text-black hover:bg-gray-400"
            >
              Add
            </div>
          </div>
          <div className="flex px-4 mt-3">
            {cats?.map((c, i) => (
              <div
                key={i}
                className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-4 py-2 rounded"
              >
                <p>{c}</p>
                <p
                  onClick={() => deleteCategory(i)}
                  className="rounded-full cursor-pointer p-1 text-sm"
                >
                  <ImCancelCircle />
                </p>
              </div>
            ))}
          </div>
        </div>
        <textarea
          rows={15}
          cols={30}
          className="px-4 py-2 outline-none text-gray-500 border-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded transition mt-4"
          placeholder="Post Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>
        {errors.length > 0 && (
          <div className="mt-1 text-red-500 text-sm">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button
          className="dark:bg-gray-900 text-white w-full mx-auto font-semibold px-4 py-2 rounded mb-4 md:text-xl text-lg mt-4 hover:text-black hover:bg-gray-400"
          type="submit"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
