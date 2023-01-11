import React, { useContext, useEffect } from "react";
import LabelContext from "../context/LabelContext";
import Spinner from "./Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ax from "../ax";

const Label = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    label,
    loader,
    selectedLabel,
    setSelectedLabel,
    setLabel,
    setLoader,
  } = useContext(LabelContext);

  const renderAll = () => {
    setSelectedLabel(null);
    navigate("/");
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    ax.get("/category", { headers: { Authorization: "Bearer " + token } }).then(
      (res) => {
        const { data } = res.data;
        setLabel(data.data);
        setLoader(false);
      }
    );
  }, []);

  return (
    <div>
      <div className="card bg-gray-100 body-header ">
        <div className="card-body">
          {loader && <Spinner />}
          {!loader && (
            <div>
              <li className="list-group-item bg-bg text-white">
                Label
                <Link to="/label" className="btn btn-sm btn-dark float-right">
                  Create
                </Link>
              </li>
              <li
                className={`list-group-item text-white cursor ${
                  pathname === "/" ? "bg-danger" : "bg-dark"
                }`}
                onClick={() => renderAll()}
              >
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp; All
              </li>
              <ul className="list-group label">
                {label.map((d) => {
                  return (
                    <Link to={`/${d.slug}/note`} key={d.id}>
                      <li
                        className={`list-group-item text-white cursor ${
                          d.id === selectedLabel ? "bg-danger" : "bg-dark"
                        }`}
                        onClick={() => setSelectedLabel(d.id)}
                      >
                        <span className="fas fa-tags text-white text-small" />
                        &nbsp; &nbsp; {d.name}
                        <span className="badge badge-primary float-right">
                          {d.note_count}
                        </span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Label;
