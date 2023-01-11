import React, { useContext, useState, useEffect } from "react";
import Master from "../Layouts/Master";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import LabelContext from "../../context/LabelContext";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
import MessageContext from "../../context/MessageContext";

const Edit = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const { slug } = useParams();
  // console.log(params);

  const { label } = useContext(LabelContext);
  const { setMessage } = useContext(MessageContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    ax.get("/note/" + slug, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      // console.log(data);
      setPageLoader(false);
      setDescription(data.data.description);
      setTitle(data.data.title);
    });
  }, []);

  const updateNote = () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    const frmData = new FormData();
    frmData.append("title", title);
    frmData.append("description", description);
    frmData.append("category_slug", category);
    frmData.append("color", color);
    frmData.append("_method", "PUT");

    ax.post("/note/" + slug, frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setLoader(false);
      if (data.success === false) {
        setMessage({ type: "error", message: "Please Enter All Fields" });
      }
      if (data.success === true) {
        setMessage({ type: "success", message: "Note Created Success!" });
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
        {pageLoader ? (
          <Spinner />
        ) : (
          <div className="card note">
            <div
              className="card-header"
              style={{ backgroundColor: color ? color : "#212529" }}
            >
              <h5 className="text-white">Update your Note</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <div>
                  <label className="text-white">Title</label>
                </div>
                <input
                  className="bg-white form-control border-0"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="form-group">
                <label className="text-white">Select Categories</label>
                <select
                  name="label"
                  className="bg-white form-control border-0"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">--Select category--</option>
                  {label.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-white">Select Color</label>
                <select
                  name="label"
                  className="bg-white form-control border-0"
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">--Select Color--</option>
                  <option value="#dc3545">Red</option>
                  <option value="#07bc0c">Green</option>
                  <option value="#34aadc">Blue</option>
                  <option value="#f1c40f">Orange</option>
                </select>
              </div>
              <div className="form-group">
                <label className="text-white">Enter Description</label>
                <ReactQuill
                  theme="snow"
                  className="bg-white"
                  value={description}
                  onChange={setDescription}
                />
              </div>
              <button
                disabled={loader}
                className="btn btn-sm btn-danger mt-3 float-right"
                onClick={() => updateNote()}
              >
                {loader && <Spinner />} update
              </button>
              <button
                onClick={() => backToHome()}
                className="btn btn-sm btn-danger mt-3"
              >
                back
              </button>
            </div>
          </div>
        )}
      </div>
    </Master>
  );
};

export default Edit;
