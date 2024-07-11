import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";

function Navbar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const isActive = (to) => {
    return location.pathname === to;
  };
  const navItem = [
    {
      name: "Dashboard",
      path: "/adminpanel",
    },
    {
      name: "Users",
      path: "/users",
    },
    {
      name: "Kids Truth",
      path: "/kidstruth",
    },
    {
      name: "Teens Truth",
      path: "/teenstruth",
    },
    {
      name: "Adults Truth",
      path: "/adultstruth",
    },
  ];
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {navItem.map((item) => (
                <NavLink
                  to={item.path}
                  className={`text-sm font-medium text-gray-300 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white ${
                    isActive(item.path) ? "bg-red-500 text-white" : ""
                  }`}
                  activeClassName="bg-red-500 text-white"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {localStorage.getItem("auth") && (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-profile-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileMenu(!profileMenu)}
                  >
                    <span className="sr-only">Open user profile</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={profile}
                      alt=""
                    />
                  </button>
                  {profileMenu && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-profile-button"
                    >
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-profile"
              aria-expanded="false"
              onClick={() => setProfileMenu(!profileMenu)}
            >
              <span className="sr-only">Open main profile</span>
              <svg
                className="h-6 w-6 block md:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className="hidden h-6 w-6 block md:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {profileMenu && (
        <div className="md:hidden" id="mobile-profile">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItem.map((item) => (
              <Link
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-white"
                aria-current="page"
                onClick={() => setProfileMenu(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {localStorage.getItem("auth") && (
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={profile}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Admin
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    admin@admin.com
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button
                  onClick={handleSignOut}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white w-full text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
