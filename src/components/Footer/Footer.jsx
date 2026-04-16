import React from "react";
import { Logo, } from "../index.js";

function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t border-slate-200/60 bg-white/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Left Side: Branding & Advice */}
          <div className="flex flex-col items-start text-left">
            <div className="mb-3 transition-transform duration-300 hover:opacity-80">
              <Logo width="55px" />
            </div>

            <p className="text-slate-500 font-medium text-sm mb-2 italic max-w-xs leading-relaxed">
              "Code with passion, build with purpose, and never stop learning."
            </p>

            <p className="text-[10px] text-slate-400 font-bold tracking-[0.1em] uppercase">
              &copy; {new Date().getFullYear()} All Rights Reserved By Monjurul
              Islam
            </p>
          </div>

          {/* Right Side: Elegant Text Links with Hover Animation */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="https://github.com/Prottoy123"
              target="_blank"
              rel="noreferrer"
              className="group relative text-sm font-bold text-slate-600 transition-colors duration-300 hover:text-slate-900"
            >
              GitHub
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="https://www.linkedin.com/in/monjurul-islam-146601249"
              target="_blank"
              rel="noreferrer"
              className="group relative text-sm font-bold text-slate-600 transition-colors duration-300 hover:text-blue-600"
            >
              LinkedIn
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="https://www.facebook.com/nirob.prottoy.9"
              target="_blank"
              rel="noreferrer"
              className="group relative text-sm font-bold text-slate-600 transition-colors duration-300 hover:text-blue-500"
            >
              Facebook
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="mailto:monjurulislamprottoy@gmail.com"
              className="group relative text-sm font-bold text-slate-600 transition-colors duration-300 hover:text-rose-500"
            >
              Email
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
