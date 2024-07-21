import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.svg";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo1} className="h-8" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BlogBuzz
            </span>
          </Link>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                to="https://parvezcodes.netlify.app/"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                MyPortfolio
              </Link>
            </li>
            <li>
              <Link
                to="https://parvezcodes.netlify.app/"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="https://parvezcodes.netlify.app/"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                Licensing
              </Link>
            </li>
            <li>
              <Link
                to="https://parvezcodes.netlify.app/"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 text-center">
          © 2025
          <Link
            to="https://flowbite.com/"
            className="hover:underline text-center"
          >
            &nbsp; BlogBuzz™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
