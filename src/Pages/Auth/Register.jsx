import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ax from "../../ax";
import AuthContext from "../../context/AuthContext";
import MessageContext from "../../context/MessageContext";
import Master from "../Layouts/Master";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  //context
  const authUserContext = useContext(AuthContext);
  const msgContext = useContext(MessageContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      msgContext.setMessage({ type: "error", message: "You Already Register" });
      navigate("/");
    }
  });

  const register = () => {
    // alert("hello");
    setLoader(true);
    var frmData = new FormData();
    frmData.append("name", name);
    frmData.append("email", email);
    frmData.append("password", password);

    ax.post("/register", frmData).then((res) => {
      // console.log(res.data);
      setLoader(false); //after got 200 network status
      const { success, data } = res.data;
      if (success === false) {
        setError(data);
      } else {
        //success
        //local storage set items it is get from api
        localStorage.setItem("token", data.token);
        //set Auth user to context it is get from api
        authUserContext.setAuthUser(data.user);
        //toastify message
        msgContext.setMessage({
          type: "success",
          message: `Welcome ${data.user.name}.`,
        });

        //redirect
        navigate("/");
      }
    });
  };
  return (
    <Master>
      {/* Body section */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8 offset-2 ">
            <div className="card note">
              <div className="card-header bg-dark">
                <h3 className="text-white">Register</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label text-white">Username</label>
                  <input
                    type="text"
                    className={`form-control bg-dark text-white ${
                      error.name && "border border-danger"
                    }`}
                    placeholder="enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error.name &&
                    error.name.map((err, index) => (
                      <small key={index} className="text-danger">
                        {err}
                      </small>
                    ))}
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input
                    type="email"
                    className={`form-control bg-dark text-white ${
                      error.email && "border border-danger"
                    }`}
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email &&
                    error.email.map((err, index) => (
                      <small key={index} className="text-danger">
                        {err}
                      </small>
                    ))}
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input
                    type="password"
                    className={`form-control bg-dark text-white ${
                      error.password && "border border-danger"
                    }`}
                    placeholder="*******"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.password &&
                    error.password.map((err, index) => (
                      <small key={index} className="text-danger">
                        {err}
                      </small>
                    ))}
                </div>
                <div className="float-right">
                  <button
                    disabled={loader}
                    type="submit"
                    className="btn btn-primary mb-3"
                    onClick={() => register()}
                  >
                    {loader && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    &nbsp; Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body end section */}
    </Master>
  );
};

export default Register;
