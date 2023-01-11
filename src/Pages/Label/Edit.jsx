import React, { useContext, useState } from "react";
import Master from "../Layouts/Master";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import ax from "../../ax";
import MessageContext from "../../context/MessageContext";

const Edit = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  // console.log(slug);
  const [label, setLabel] = useState();
  const [loader, setLoader] = useState(false);

  const { setMessage } = useContext(MessageContext);

  const updateLabel = () => {
    const token = localStorage.getItem("token");
    var frmData = new FormData();
    frmData.append("name", label);
    frmData.append("_method", "PUT");
    ax.post("/category/" + slug, frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setLoader(false);
      if (data.success) {
        setMessage({ type: "success", message: "Label Updated label" });
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
                  disabled={loader}
                  onClick={() => updateLabel()}
                  className="btn btn-sm btn-danger mt-2 mb-2 float-right"
                >
                  {loader ? <Spinner /> : "update"}
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

export default Edit;
