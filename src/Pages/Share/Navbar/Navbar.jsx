import React from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleLogout = () => {
    signOutUser()
      .then((result) => {
        console.log("User logged out successfully", result.user);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };
  const links = [
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/all-scholarships"}>All Scholarships</Link>
      </li>
      <li>
        <Link>About Us</Link>
      </li>
      <li>
        <Link>Contact Us</Link>
      </li>
    </>,
  ];

  return (
    <div>
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <img
            src="https://i.ibb.co.com/zHtFPGWb/logo-2.png"
            alt=""
            width={"50px"}
            className="scale-200"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to={"/login"} className="btn btn-neutral btn-outline mr-4">
                SignIn
              </Link>
              <Link
                to={"/register"}
                className="btn btn-neutral btn-outline mr-4"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
