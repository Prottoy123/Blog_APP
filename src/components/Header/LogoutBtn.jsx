import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-block px-5 py-2 text-sm font-bold text-slate-600 transition-all duration-300 rounded-full hover:bg-rose-100 hover:text-rose-700 active:scale-95"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
