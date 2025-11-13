import React from "react";
import error from "../assets/error-404.png";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img className="h-120 w-120" src={error} alt="" />
      <Link to="/">
        <button className="flex items-center gap-3 bg-purple-500 p-2 rounded mt-5 font-semibold">
          <FaArrowLeft></FaArrowLeft>Back To Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
