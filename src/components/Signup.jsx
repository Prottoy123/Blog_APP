import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError(""); 
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black px-4 py-12">
      <div className="mx-auto w-full max-w-lg bg-white rounded-3xl p-10 shadow-[0_0_50px_-12px_rgba(79,70,229,0.4)] border border-indigo-100/20 transition-all">
        <div className="mb-8 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-3xl font-black text-slate-900 tracking-tighter">
          Sign up to create account
        </h2>

        <p className="mt-3 text-center text-sm text-slate-600 font-medium">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-bold text-indigo-600 transition-all duration-300 hover:text-indigo-500 hover:underline hover:drop-shadow-sm"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 rounded-r-lg shadow-sm">
            <p className="text-sm text-red-700 font-semibold text-center">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter Your Full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <button
              type="submit"
              className="w-full px-4 py-4 mt-4 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
