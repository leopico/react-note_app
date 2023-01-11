import React, { useContext, useEffect, useState } from "react";
import Master from "./Layouts/Master";
import { Link, useNavigate, useParams } from "react-router-dom";
import MessageContext from "../context/MessageContext";
import Label from "../Components/Label";
import ax from "../ax";
import Spinner from "../Components/Spinner";

const Home = () => {
  const navigate = useNavigate();
  const message = useContext(MessageContext);
  const { category_slug } = useParams();
  // console.log(category_slug);

  const [note, setNote] = useState({});
  const [pageLoader, setPageLoader] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const [contributeLoader, setContributeLoader] = useState(true);
  const [contributeNote, setContributeNote] = useState([]);
  const [receiveLoader, setReceiveLoader] = useState(true);
  const [receiveNote, setReceiveNote] = useState([]);

  useEffect(() => {
    setPageLoader(true);
    if (!localStorage.getItem("token")) {
      message.setMessage({ type: "error", message: "Please login first" });
      navigate("/login");
    }

    //get all note
    const token = localStorage.getItem("token");
    var url = "/note";
    if (category_slug) {
      url += "?category_slug=" + category_slug;
    }

    //note
    ax.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      ({ data }) => {
        // console.log(data);
        setNote(data.data.data);
        setNextPage(data.data.next_page_url);
        setPageLoader(false);
      }
    );

    //get contribute note
    ax.get("/contribute-note/get", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      if (data.success) {
        setContributeLoader(false);
        setContributeNote(data.data.data);
      }
    });

    //get received note
    ax.get("/receive-note/get", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      if (data.success) {
        setReceiveLoader(false);
        setReceiveNote(data.data.data);
      }
    });
  }, [category_slug]);

  const renderNextPage = () => {
    setLoadMoreLoader(true);
    const token = localStorage.getItem("token");
    ax.get(nextPage, { headers: { Authorization: `Bearer ${token}` } }).then(
      ({ data }) => {
        setNote([...note, ...data.data.data]);
        setNextPage(data.data.next_page_url);
        setLoadMoreLoader(false);
      }
    );
  };

  const deleteNote = (slug) => {
    setDeleteLoader(slug);
    var frmData = new FormData();
    const token = localStorage.getItem("token");
    frmData.append("_method", "DELETE");
    ax.post("/note/" + slug, frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setDeleteLoader(false);
      if (data.success) {
        setNote(note.filter((d) => d.slug !== slug));
        message.setMessage({ type: "success", message: "Note deleted" });
      }
    });
  };

  return (
    <div>
      <Master>
        {/* Body section */}
        <div className="container mt-3">
          <div className="row">
            {/* For Category and contribute */}
            <div className="col-md-4">
              {/* For Category */}
              <Label />
              {/* For Category */}
              {/* For contribute note */}
              <div className="card bg-gray-100 contribute mb-4">
                <div className="card-body">
                  <li className="list-group-item bg-bg text-white">
                    Contribute Notes
                    <Link
                      to="/show/contribute"
                      className="badge badge-dark  text-white float-right"
                    >
                      Show All
                    </Link>
                  </li>
                  {contributeLoader ? (
                    <Spinner />
                  ) : (
                    <ul className="list-group label">
                      {contributeNote &&
                        contributeNote.map((d) => {
                          return (
                            <li className="list-group-item bg-dark text-white">
                              <i className="far fa-newspaper" />
                              &nbsp; You share &nbsp;
                              <Link
                                to={`/note/${d.note.slug}`}
                                className="text-primary"
                              >
                                {d.note.title}
                              </Link>
                              &nbsp;<small>to</small>&nbsp;
                              <b className="text-primary">
                                {d.receive_user.name}
                              </b>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </div>
              </div>
              {/* end contribute note */}
              {/* For Received note */}
              <div className="card bg-gray-100 contribute">
                <div className="card-body">
                  <li className="list-group-item bg-bg text-white">
                    Received Notes
                    <Link
                      to="/show/receive"
                      className="badge badge-dark  text-white float-right"
                    >
                      Show All
                    </Link>
                  </li>
                  {receiveLoader ? (
                    <Spinner />
                  ) : (
                    <ul className="list-group label">
                      {receiveNote &&
                        receiveNote.map((d) => {
                          return (
                            <li className="list-group-item bg-dark text-white">
                              <i className="far fa-newspaper" />
                              &nbsp; You got &nbsp;
                              <Link
                                to={`/note/${d.note.slug}`}
                                className="text-primary"
                              >
                                {d.note.title}
                              </Link>
                              &nbsp;
                              <small> from</small>&nbsp;
                              <b className="text-primary">
                                {d.contribute_user.name}
                              </b>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </div>
              </div>
              {/* end Received note */}
            </div>
            {/* end Category and contribute */}
            <div className="col-md-8">
              <div className="card">
                <div className="card-body note">
                  <Link
                    to="/note/create"
                    className="btn btn-sm btn-primary mb-3"
                  >
                    Create New
                  </Link>
                  {pageLoader && <Spinner />}
                  {!pageLoader && (
                    <div className="row">
                      {/* Loop Product */}
                      {note.map((d) => {
                        return (
                          <div className="col-md-4 mb-3" key={d.id}>
                            <div className="card">
                              <Link to={`/note/${d.slug}`}>
                                <div
                                  className="card-header label-1"
                                  style={{ backgroundColor: d.color }}
                                >
                                  <h5 className="text-white label-2">
                                    {d.title}
                                  </h5>
                                </div>
                              </Link>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-4 text-center">
                                    <Link
                                      title="update"
                                      to={`/note/${d.slug}`}
                                      className="badge badge-primary"
                                    >
                                      <i className="fas fa-eye" />
                                    </Link>
                                  </div>
                                  <div className="col-md-4 text-center">
                                    <Link
                                      title="contribute"
                                      to={`/contribute/${d.slug}`}
                                      className="badge badge-warning"
                                    >
                                      <i className="fas fa-share" />
                                    </Link>
                                  </div>
                                  <div className="col-md-4 text-center delete-1">
                                    <span
                                      title="delete"
                                      onClick={() => deleteNote(d.slug)}
                                      className="badge badge-danger"
                                    >
                                      {deleteLoader === d.slug ? (
                                        <Spinner />
                                      ) : (
                                        <i className="fas fa-trash" />
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* body end section */}
      </Master>
    </div>
  );
};

export default Home;
