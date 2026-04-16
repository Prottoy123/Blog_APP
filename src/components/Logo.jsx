import React from "react";
import logo from "../assets/logo.svg"
function Logo({ width = "100px", className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logo}
        alt="Oren Logo"
        style={{ width: width }}
        className="object-contain"
      />
    </div>
  );
}

export default Logo;
