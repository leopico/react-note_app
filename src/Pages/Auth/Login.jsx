import React, { useContext, useEffect, useState } from "react";
import Master from "../Layouts/Master";
import ax from "../../ax";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import LabelContext from "../../context/LabelContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  //context
  const loginUserContext = useContext(AuthContext);
  const msgContext = useContext(MessageContext);
  const { setLabel } = useContext(LabelContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      msgContext.setMessage({ type: "error", message: "You Already login" });
      navigate("/");
    }
  }, []);

  const login = () => {
    // alert("okay");
    setLoader(true);

    var frmData = new FormData();
    frmData.append("email", email);
    frmData.append("password", password);

    ax.post("/login", frmData).then((res) => {
      // console.log(res.data);
      setLoader(false);
      const { token, user } = res.data.data;
      //success
      //local storage set item, it is get from api
      localStorage.setItem("token", token);
      //set login user,it is get form api
      loginUserContext.setAuthUser(user);
      //toast message
      msgContext.setMessage({
        type: "success",
        message: `Welcome back ${user.name}.`,
      });

      ax.get("/category", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(({ data }) => {
        // console.log(data);
        setLabel(data.data.data);
        //redirect
        navigate("/");
      });
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
                <h3 className="text-white">Login</h3>
              </div>
              <div className="card-body">
                <form action="">
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control bg-dark text-white ${
                        error.email && "border border-danger"
                      }`}
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email &&
                      error.email.map((err, index) => {
                        return (
                          <small className="text-danger" key={index}>
                            {err}
                          </small>
                        );
                      })}
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Password</label>
                    <input
                      type="password"
                      className={`form-control bg-dark text-white ${
                        error.email && "border border-danger"
                      }`}
                      placeholder="*******"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error.password &&
                      error.password.map((err, index) => {
                        return (
                          <small className="text-danger" key={index}>
                            {err}
                          </small>
                        );
                      })}
                  </div>
                  <div className="float-right">
                    <button
                      onClick={() => login()}
                      disabled={loader}
                      type="submit"
                      className="btn btn-primary mb-3"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body end section */}
    </Master>
  );
};

export default Login;
