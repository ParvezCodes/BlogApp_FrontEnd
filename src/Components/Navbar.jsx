import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.svg";
import { FaBars } from "react-icons/fa6";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../Context/userContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    if (prompt) {
      navigate(`/?title=${prompt}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="flex items-center justify-between flex-col px-6 py-4 md:flex-row md:px-[200px] bg-white border-gray-200 dark:bg-gray-900 text-white">
      <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <Link to="/">
          <img src={logo1} className="h-8" alt="" />
        </Link>
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          <Link to="/">BlogBuzz</Link>
        </span>
      </div>

      <div className="flex items-center justify-end w-full">
        {path === "/" && (
          <div className="flex items-center space-x-0 md:space-x-4 ">
            <p onClick={handleSearch}>
              <FaSearch />
            </p>
            <input
              type="text"
              className="outline-none px-3 py-1 mr-7 dark:bg-gray-900"
              placeholder="Search"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3 className="font-semibold">
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3 className="font-semibold">
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu} className="cursor-pointer">
              <FaBars />
              {menu && <Menu />}
            </div>
          ) : (
            <h3 className="font-semibold">
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div className="md:hidden text-lg cursor-pointer" onClick={showMenu}>
          <div>
            <FaBars />
            {menu && <Menu />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
