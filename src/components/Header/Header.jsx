import React from "react";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex items-center space-x-1 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-5 py-2.5 text-sm font-bold text-slate-700 transition-all duration-300 rounded-full hover:bg-amber-100/60 hover:text-amber-900 hover:shadow-sm active:scale-95"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="ml-2 pl-2 border-l border-slate-200">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
