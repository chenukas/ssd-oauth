import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button } from "@material-ui/core";
import download from "../../images/download.png";
import trash from "../../images/trash.png";
import edit from "../../images/edit.png";
import add from "../../images/add.png";
import axios from "axios";
import { saveAs } from "file-saver";
import { Card } from "react-bootstrap";
import Navbar from "../Navbar";

const DisplayFiles = (props) => {
  const [token, setToken] = useState({
    access_token: `${localStorage.getItem("accessToken")}`,
  });
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);

  const downloadFile = (id, image) => {
    axios
      .post(`http://localhost:5000/download/${id}`, { token })
      .then((response) => {
        saveAs(
          `https://drive.google.com/uc?export=view&id=${id}`,
          image.split(".")[0]
        );
        var file = new Blob(
          [`https://drive.google.com/uc?export=view&id=${id}`],
          { type: "image/jpeg" }
        );
        saveAs(file, image.split(".")[0]);
      });
  };

  const deleteFile = (id) => {
    axios
      .post(`http://localhost:5000/deleteFile/${id}`, { token })
      .then((res) => {
        window.location = "/files";
      });
  };

  useEffect(() => {
    //setToken(props.token);
    if (count === 0) {
      axios.post(`http://localhost:5000/readDrive`, { token }).then((res) => {
        //setFiles(res.data);
        setFiles(
          res.data?.filter(
            (f) => f.mimeType === "image/jpeg" || f.mimeType === "image/png"
          )
        );
      });
      setCount(count + 1);
    }
  });
  return (
    <>
      <Navbar />
      <div className="container">
        <div
          className="row"
          style={{ marginBottom: "3rem", marginTop: "2rem" }}
        >
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#551a8b",
                color: "#fff",
                fontWeight: "bold",
              }}
              className="btn-text"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <img
                src={add}
                style={{ height: "0.8rem", width: "0.8rem" }}
                alt="add"
              />
              &nbsp; Add Photos
            </Button>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Add a new Photo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{
                    backgroundColor: "#551a8b",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {files.length > 0 &&
              files.map((file, key) => (
                <div
                href="https://unsplash.it/1200/768.jpg?image=251"
                data-toggle="lightbox"
                  data-gallery="gallery"
                  className="col-md-4"
                  style={{ textDecoration: "none" }}
                  key={key}
                >
                  <img
                    src={`https://drive.google.com/uc?export=view&id=${file.id}`}
                    className="img-fluid rounded mb-3"
                    style={{ width: 300, height: 200 }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "black", marginLeft: 100 }}>
                      {file?.name?.split(".")[0]}
                    </Card.Title>
                    <div className="row">
                      <div className="col-3" style={{ marginLeft: 50 }}>
                        <div>
                          <button
                            className="btn"
                            onClick={() => deleteFile(file.id)}
                          >
                            <img
                              src={trash}
                              className="file-icons"
                              alt="delete"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="col-3">
                        <div>
                          <button
                            className="btn"
                            onClick={() => downloadFile(file.id, file.name)}
                          >
                            <img
                              src={download}
                              className="file-icons"
                              alt="download"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayFiles;
