import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import logo from "../assets/favicon.png";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav
      data-aos="fade-down"
      className="bg-purple-400 p-2 px-5 rounded-2xl w-11/17 mx-auto mt-5 relative flex flex-col gap-2"
    >
      <div className="flex items-center justify-between md:justify-start">
        <div className="flex items-center gap-1 md:gap-5">
          <button
            onClick={() => setOpen(!open)}
            className="text-white focus:outline-none md:hidden"
          >
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white"></div>
          </button>
          <img className="w-7 h-7 ml-3" src={logo} alt="Logo" />
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex items-center gap-6 font-semibold ml-20">
          <NavLink to="/" className="text-white hover:text-gray-200">
            Home
          </NavLink>
          <NavLink to="/allModel" className="text-white hover:text-gray-200">
            All Model
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/addModel"
                className="text-white hover:text-gray-200"
              >
                Add Model
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "dark"}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-6 h-6 text-yellow-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17l-.71.71a.996.996 0 101.41 1.41l.71-.71A.996.996 0 105.64 17zM12 4a1 1 0 100 2 1 1 0 000-2zm7.05 1.64a.996.996 0 00-1.41 0l-.71.71a.996.996 0 101.41 1.41l.71-.71a.996.996 0 000-1.41zM4 12a1 1 0 100 2 1 1 0 000-2zm8 8a1 1 0 100-2 1 1 0 000 2zm6.36-2.64a.996.996 0 10-1.41-1.41l-.71.71a.996.996 0 101.41 1.41l.71-.71zM20 12a1 1 0 100 2 1 1 0 000-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13.65A9 9 0 1112 3a7 7 0 009.64 10.65z" />
            </svg>
          </label>

          {/* Login button */}
          {user ? (
            <Link to="/userProfile" className="flex items-center gap-2">
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-emerald-300 px-3 py-1 rounded text-white hover:bg-emerald-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div className="flex flex-col md:hidden gap-4 mt-4 font-semibold bg-purple-400 p-4 rounded-2xl transition-all duration-300 ease-in-out">
          <NavLink
            to="/"
            className="text-white hover:text-gray-200"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/allModel"
            className="text-white hover:text-gray-200"
            onClick={() => setOpen(false)}
          >
            All Model
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/addModel"
                className="text-white hover:text-gray-200"
                onClick={() => setOpen(false)}
              >
                Add Model
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
