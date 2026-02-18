
import React from "react";
import thinknest from "../assets/last.png";

function Logo() {
  return (
    <div className="flex items-center gap-2">

      {/* Logo Image */}
      <img
        src={thinknest}
        alt="ThinkNest Logo"
        className="
        rounded-full object-cover
        w-7 h-7
        md:w-10 md:h-10
        "
      />

      {/* Logo Text */}
      <span className="
        font-bold text-black dark:text-white
        text-base
        md:text-xl
        leading-none
      ">
        ThinkNest
      </span>

    </div>
  );
}

export default Logo;
