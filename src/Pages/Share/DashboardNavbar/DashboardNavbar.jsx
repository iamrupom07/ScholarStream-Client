import React from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const DashboardNavbar = () => {
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

  return (
    <div>
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <Link to={"/"}>
            <img
              src="https://i.ibb.co.com/zHtFPGWb/logo-2.png"
              alt=""
              width={"50px"}
              className="scale-200"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
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
                    src={user.photoURL}
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
                  <Link onClick={handleLogout} to={"/"}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
