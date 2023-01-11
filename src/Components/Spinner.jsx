import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-item-center p-2">
      <div
        className="spinner-border spinner-border-sm mb-1 text-warning"
        role="status"
        aria-hidden="true"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
