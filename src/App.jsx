import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import PostDetail from "./Pages/PostDetail.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Profile from "./Pages/Profile.jsx";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./Context/userContext.jsx";
import MyPosts from "./Pages/MyPosts.jsx";

const App = () => {
  const location = useLocation();
  const showHeaderFooter = !["/login", "/register"].includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      <UserContextProvider>
        {showHeaderFooter && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/post/:id" element={<PostDetail />} />
            <Route path="/write" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/myposts/:id" element={<MyPosts />} />
          </Routes>
          <Toaster />
        </main>
        {showHeaderFooter && <Footer />}
      </UserContextProvider>
    </div>
  );
};

export default App;
