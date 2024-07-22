import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo1.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const reqBody = { username: username, email: email, password: password };
    setErrors([]);

    try {
      const res = await axios.post(process.env.url`/api/v1/auth/register`, reqBody, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res);
      toast.success(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          setErrors([error.response.data.error]); // Set a single error message
        } else if (error.response.data.errors) {
          const errors = error.response.data.errors;
          const messages = errors.map((err) => err.msg);
          setErrors(messages); // Set multiple error messages
        } else {
          setErrors(["An unexpected error occurred"]);
        }
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
      <div className="container px-6 py-28 mx-auto lg:py-96">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <Link to="/">
              <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
            </Link>

            <h1 className="mt-4 text-gray-600 text-bold dark:text-gray-300 md:text-lg">
              <Link to="/">BlogBuzz</Link>
            </h1>

            <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
              Create an account
            </h1>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mt-0">
            <form className="w-full lg:max-w-xl" onSubmit={handleRegister}>
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errors.length > 0 && (
                <div className="mt-4 text-red-600">
                  {errors.map((msg, index) => (
                    <p key={index}>{msg}</p>
                  ))}
                </div>
              )}

              <div className="mt-8 md:flex md:items-center">
                <button
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  type="submit"
                >
                  Register
                </button>

                <Link
                  to="/login"
                  className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline dark:text-blue-400"
                >
                  Already have an account? <b>Sign in</b>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
