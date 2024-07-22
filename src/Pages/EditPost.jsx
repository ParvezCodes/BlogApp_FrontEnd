import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../main";
import { UserContext } from "../Context/userContext";
import toast from "react-hot-toast";

function EditPost() {
  const { id: postId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [existingFileName, setExistingFileName] = useState("");

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(process.env.url`/api/v1/posts/${postId}`, {
        withCredentials: true,
      });
      const fetchedPost = res.data.post;
      setPost(fetchedPost);
      setTitle(fetchedPost.title);
      setDesc(fetchedPost.desc);
      setCats(fetchedPost.categories);
      setExistingFileName(fetchedPost.photo);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostUpdate = async (e) => {
    e.preventDefault();

    let updatedPost = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const imgUpload = await axios.post(
          process.env.url + "/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        updatedPost.photo = imgUpload.data.filename;
      } catch (error) {
        console.log(error);
        toast.error("Image upload failed");
        return;
      }
    } else {
      updatedPost.photo = existingFileName; // Use existing file name if no new file is selected
    }

    try {
      const res = await axios.put(
        `${url}/api/v1/posts/update/${postId}`,
        updatedPost,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.msg);
      toast.success(res.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
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

  const addCategory = () => {
    if (cat) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  return (
    <div className="px-4 md:px-[200px] mt-8">
      <h1 className="font-bold md:text-2xl text-xl text-center">Update Post</h1>
      <form className="w-full flex flex-col mt-4" onSubmit={handlePostUpdate}>
        <input
          type="text"
          placeholder="Post Title"
          className="px-4 py-3 outline-none border-b-2 text-gray-500 border-2 border-gray-300  focus:border-gray-900 focus:ring-gray-900 rounded transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="flex flex-col mt-4">
          <input
            type="file"
            id="file"
            className="opacity-0 h-1 md:w-[20%]"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-gray-900 text-white px-4 py-2 rounded text-center mb-2 md:w-[30%] hover:text-black hover:bg-gray-400"
          >
            {selectedFile
              ? selectedFile.name
              : existingFileName
              ? existingFileName
              : "Add Photo"}
          </label>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input
              type="text"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              placeholder="Post Category"
              className="px-4 py-3 outline-none text-gray-500 border-2 border-gray-300  focus:border-gray-900 focus:ring-gray-900 rounded transition"
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
                className="flex justify-center items-center space-x-2 mr-2 bg-gray-200 px-4 py-2 rounded"
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
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="px-4 py-2 outline-none text-gray-500 border-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded transition mt-4"
          placeholder="Post Description"
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
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
