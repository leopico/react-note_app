import React from "react";
import "../Err.css";

const Error = () => {
  return (
    <div className="error">
      <h2 className="text-white">Oops! Page not found.</h2>
      <h1 className="text-white">404</h1>
      <p className="text-white">We can't find the page you're looking for.</p>
    </div>
  );
};

export default Error;
