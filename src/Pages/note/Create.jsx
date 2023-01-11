import React, { useContext, useState } from "react";
import Master from "../Layouts/Master";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import LabelContext from "../../context/LabelContext";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
import MessageContext from "../../context/MessageContext";

const Create = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { label } = useContext(LabelContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);

  const { setMessage } = useContext(MessageContext);

  const storeNote = () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    var frmData = new FormData();
    frmData.append("title", title);
    frmData.append("description", description);
    frmData.append("category_slug", category);
    frmData.append("color", color);

    ax.post("/note", frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setLoader(false);
      if (data.success === false) {
        setMessage({ type: "error", message: "Please Enter All Fields" });
        setError(data.data); //this is for error validation
      }
      if (data.success === true) {
        setMessage({ type: "success", message: "Note Created Success!" });
        setError(data.data);
        return;
      }
    });
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <Master>
      <div className="col-md-6 offset-md-3 mt-3 mb-5">
        <div className="card note">
          <div
            className="card-header"
            style={{ backgroundColor: color ? color : "#212529" }}
          >
            <h3 className="text-white">Create Note</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <div>
                <label className="text-white">Title</label>
              </div>
              <input
                className={`bg-white form-control border-0 ${
                  error.title && "border border-danger"
                }`}
                onChange={(e) => setTitle(e.target.value)}
              />
              {error.title &&
                error.title.map((d) => (
                  <small key={d.id} className="text text-danger">
                    {d}
                  </small>
                ))}
            </div>
            <div className="form-group">
              <label className="text-white">Select Categories</label>
              <select
                name="label"
                className={`bg-white form-control border-0 ${
                  error.category_slug && "text text-danger"
                }`}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">--Select category--</option>
                {label.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
              {error.category_slug &&
                error.category_slug.map((d) => (
                  <small key={d.id} className="text text-danger">
                    {d}
                  </small>
                ))}
            </div>
            <div className="form-group">
              <label className="text-white">Select Color</label>
              <select
                name="label"
                className={`bg-white form-control border-0 ${
                  error.color && "text text-danger"
                }`}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">--Select Color--</option>
                <option value="#dc3545">Red</option>
                <option value="#07bc0c">Green</option>
                <option value="#34aadc">Blue</option>
                <option value="#f1c40f">Orange</option>
              </select>
              {error.color &&
                error.color.map((d) => (
                  <small key={d.id} className="text text-danger">
                    {d}
                  </small>
                ))}
            </div>
            <div className="form-group">
              <label className="text-white">Enter Description</label>
              <ReactQuill
                theme="snow"
                className={`bg-white  ${
                  error.description && "border border-danger"
                }`}
                value={description}
                onChange={setDescription}
              />
              {error.description &&
                error.description.map((d) => (
                  <small key={d.id} className="text text-danger">
                    {d}
                  </small>
                ))}
            </div>
            <button
              disabled={loader}
              className="btn btn-sm btn-danger mt-3 float-right"
              onClick={() => storeNote()}
            >
              {loader && <Spinner />} create note
            </button>
            <button
              onClick={() => backToHome()}
              className="btn btn-sm btn-danger mt-3"
            >
              back
            </button>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default Create;
