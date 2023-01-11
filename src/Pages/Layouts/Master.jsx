import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LabelContext from "../../context/LabelContext";

const Master = (props) => {
  const navigate = useNavigate();

  const authUser = useContext(AuthContext);
  const { setSelectedLabel } = useContext(LabelContext);

  const logout = () => {
    localStorage.removeItem("token");
    authUser.setAuthUser({});
    navigate("/login");
  };
  const renderHome = () => {
    setSelectedLabel("");
    navigate("/");
  };
  return (
    <div>
      {/* Header */}
      <div className="container-fluid" id="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <span
              className="navbar-brand text-white"
              onClick={() => renderHome()}
            >
              Note-App
            </span>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              </ul>
              <div className="form-inline mr-5"></div>
            </div>
          </div>
        </nav>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-white">Welcome From Note-App</h1>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Praesentium sequi voluptas similique sed minima rerum labore
                reprehenderit, illo recusandae quasi tempore placeat aliquam
                autem, a soluta nisi totam temporibus dolorem!
              </p>
              {localStorage.getItem("token") ? (
                <button
                  onClick={() => logout()}
                  to="/login"
                  className="btn btn-danger"
                >
                  Logout
                </button>
              ) : (
                <div>
                  <Link to="/register" className="btn btn-outline-primary mr-2">
                    SignUp
                  </Link>
                  <Link to="/login" className="btn btn-primary mr-2">
                    Login
                  </Link>
                </div>
              )}
            </div>
            <div className="col-md-6 text-center">
              <img
                className=""
                src="https://wp.xpeedstudio.com/seocify/home-fifteen/wp-content/uploads/sites/27/2020/03/home17-banner-image-min.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* End Header */}
      {props.children}
    </div>
  );
};

export default Master;
