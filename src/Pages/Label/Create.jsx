import React, { useState, useContext } from "react";
import Master from "../Layouts/Master";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import ax from "../../ax";
import MessageContext from "../../context/MessageContext";

const Create = () => {
  const navigate = useNavigate();
  const [label, setLabel] = useState("");
  const [loader, setLoader] = useState(false);

  const { setMessage } = useContext(MessageContext);

  const storeLabel = () => {
    const token = localStorage.getItem("token");
    var frmData = new FormData();
    frmData.append("name", label);
    ax.post("/category", frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      // console.log(data);
      setLoader(false);
      if (data.success === true) {
        setMessage({ type: "success", message: "Label Created Success" });
        setLabel("");
      }
    });
    setLoader(true);
  };

  const homeBack = () => {
    navigate("/label");
  };
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3  bg-secondary rounded mt-3">
            <div className="form-group">
              <label className="text-white mt-2">Enter Label</label>
              <input
                type="text"
                className="form-control bg-dark text-white"
                onChange={(e) => setLabel(e.target.value)}
                value={label}
              />
              <div>
                <button
                  className="btn btn-sm btn-danger mt-2 mb-2 float-right"
                  type="submit"
                  onClick={() => storeLabel()}
                >
                  {loader ? <Spinner /> : "create"}
                </button>
              </div>
            </div>
            <div>
              <i
                onClick={() => homeBack()}
                className="fa-solid fa-arrow-right-from-bracket btn"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default Create;
