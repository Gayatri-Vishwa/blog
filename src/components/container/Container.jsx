import React from "react";

function Container({ children }) {
    // return can be in single line without ()
  return <div className="w-full max-w-7xl px-4">{children}</div>;
}

export default Container;
