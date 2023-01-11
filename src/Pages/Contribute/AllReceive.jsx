import React, { useEffect, useState } from "react";
import Master from "../Layouts/Master";
import { Link, useNavigate } from "react-router-dom";
import ContributeButton from "../../Components/ContributeButton";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";

const AllReceive = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    //get received note
    ax.get("/receive-note/get", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      if (data.success) {
        setLoader(false);
        setData(data.data.data);
      }
    });
  });

  const backToHome = () => {
    navigate("/");
  };
  return (
    <Master>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card p-2 bg-dark">
              <ContributeButton />
              {loader ? (
                <Spinner />
              ) : (
                <div>
                  <ul className="mt-2 list-group-item">
                    {data.map((d) => {
                      return (
                        <li className="list-group-item">
                          <small className="text-primary">You received</small>{" "}
                          &nbsp;
                          <Link
                            to={`/note/${d.note.slug}`}
                            className="text-dark"
                          >
                            <b>{d.note.title}</b>
                          </Link>
                          &nbsp;
                          <small className="text-primary">From</small>
                          &nbsp;
                          <span className="text-dark">
                            <b>{d.contribute_user.name}</b>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={() => backToHome()}
              className="btn btn-sm btn-dark float-right my-3"
            >
              back
            </button>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default AllReceive;
