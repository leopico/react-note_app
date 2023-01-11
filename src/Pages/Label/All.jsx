import React, { useContext, useEffect, useState } from "react";
import Master from "../Layouts/Master";
import { Link, useNavigate } from "react-router-dom";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
import MessageContext from "../../context/MessageContext";

const All = () => {
  const navigate = useNavigate();
  const [label, setLabel] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);

  const { setMessage } = useContext(MessageContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    ax.get("/category", { headers: { Authorization: `Bearer ${token}` } }).then(
      ({ data }) => {
        setLabel(data.data.data);
        setNextPage(data.data.next_page_url);
        setPageLoader(false);
      }
    );
    setPageLoader(true);
  }, []);

  const renderNextPage = () => {
    const token = localStorage.getItem("token");
    ax.get(nextPage, { headers: { Authorization: `Bearer ${token}` } }).then(
      ({ data }) => {
        setLabel([...label, ...data.data.data]);
        setNextPage(data.data.next_page_url);
        setLoadMoreLoader(false);
      }
    );
    setLoadMoreLoader(true);
  };

  const deleteLabel = (slug) => {
    setPageLoader(true);
    var frmData = new FormData();
    frmData.append("_method", "DELETE");
    const token = localStorage.getItem("token");
    ax.post("/category/" + slug, frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setPageLoader(false);
      setLabel(label.filter((d) => d.slug !== slug));
      setMessage({ type: "success", message: "Label deleted" });
    });
  };

  const backHome = () => {
    navigate("/");
  };
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Link
              to="/label/create"
              className="btn btn-sm btn-danger mb-2 mt-2"
            >
              Create
            </Link>
            {pageLoader ? (
              <Spinner />
            ) : (
              <table class="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {label.map((d) => (
                    <tr key={d.id}>
                      <th scope="row">{d.id}</th>
                      <td>{d.name}</td>
                      <td>
                        <Link
                          to={`/label/edit/${d.slug}`}
                          className="btn btn-sm btn-primary mr-3"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteLabel(d.slug)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div>
              {/* For Load */}
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    disabled={nextPage === null ? true : false}
                    className="btn btn-primary btn-fab btn-icon btn-round"
                    onClick={() => renderNextPage()}
                  >
                    {loadMoreLoader ? (
                      <Spinner />
                    ) : (
                      <i className="fas fa-arrow-down"></i>
                    )}
                  </button>
                </div>
              </div>
              <button
                className="btn btn-sm btn-dark float-right mb-3"
                onClick={() => backHome()}
              >
                back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default All;
