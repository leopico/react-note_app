import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Master from "../Layouts/Master";
import Spinner from "../../Components/Spinner";
import ax from "../../ax";
import MessageContext from "../../context/MessageContext";

const SearchUsers = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [contributeLoader, setContributeLoader] = useState(false);
  const [foundUser, setFoundUser] = useState(false);
  const { slug } = useParams();

  const { setMessage } = useContext(MessageContext);

  const token = localStorage.getItem("token");
  const findUser = () => {
    setLoader(true);
    ax.post(
      "/search/user",
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(({ data }) => {
      if (data.success) {
        // console.log(data.data);
        setMessage({ type: "success", message: "Email Founded" });
        setLoader(false);
        setFoundUser(data.data);
      } else {
        setLoader(false);
        setMessage({ type: "error", message: "Email not found" });
        setFoundUser(false);
      }
    });
  };

  const userContribute = () => {
    setContributeLoader(true);
    ax.post(
      "/contribute-note/create",
      { note_slug: slug, user_email: foundUser.email },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(({ data }) => {
      setContributeLoader(false);
      if (data.success) {
        setMessage({ type: "success", message: "contributed" });
        setFoundUser(false);
      }
    });
  };

  const backToHome = () => {
    navigate("/");
  };
  return (
    <Master>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card ">
              <div className="card-header text-mute bg-secondary">
                Contribute Form
              </div>
              <div className="card-body">
                <div className="form-group mt-2">
                  <label className="mr-2 text-light">Enter Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-group bg-secondary text-light mr-4"
                  />
                  <button
                    onClick={() => findUser()}
                    className="btn btn-secondary text-light mb-2"
                  >
                    {loader ? <Spinner /> : "search"}
                  </button>
                </div>
              </div>
              {foundUser && (
                <div className="p-2">
                  <hr />
                  <div className="card bg-secondary p-3">
                    <h1 className="text-mute text-center">
                      {foundUser.name} Found!
                    </h1>
                    <button
                      onClick={() => userContribute()}
                      className="btn btn-dark text-mute"
                    >
                      {contributeLoader ? <Spinner /> : "contribute"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => backToHome()}
              className="btn btn-sm btn-dark float-right mt-3"
            >
              back
            </button>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default SearchUsers;
