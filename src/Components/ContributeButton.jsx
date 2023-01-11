import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContributeButton = () => {
  const { pathname } = useLocation();
  //   alert(pathname);
  return (
    <div>
      <Link
        to="/show/contribute"
        class={`${
          pathname === "/show/contribute" ? "btn-info" : "btn btn-outline-info"
        } btn mr-2`}
      >
        Contribute
      </Link>
      <Link
        to="/show/receive"
        class={`${
          pathname === "/show/receive" ? "btn-info" : "btn-outline-info"
        } btn`}
      >
        Received
      </Link>
    </div>
  );
};

export default ContributeButton;
