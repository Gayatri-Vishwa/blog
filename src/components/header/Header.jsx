

import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../DarkMode";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-2">
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkMode />
            {authStatus && <LogoutBtn />}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop & Mobile Menu */}
          <ul
            className={`flex-col md:flex-row md:flex items-center absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-800 border-t md:border-0 md:space-x-3 transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-96 py-2" : "max-h-0"
            } md:max-h-full`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="md:my-0 my-1 text-center">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMenuOpen(false); // close mobile menu after click
                      }}
                      className="px-4 py-2 font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 rounded transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Desktop Only: DarkMode & Logout */}
            <li className="hidden md:block">
              <DarkMode />
            </li>
            {authStatus && <li className="hidden md:block"><LogoutBtn /></li>}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
