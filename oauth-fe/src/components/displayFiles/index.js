import React from "react";
import './styles.css';
import { Button } from "@material-ui/core";
import download from '../../images/download.png';
import edit from '../../images/edit.png';

const DisplayFiles = () => {
  return (
    <div className="container">
      <div className="row" style={{ marginBottom: "5rem", marginTop: "5rem" }}>
        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#551a8b", color: "#fff" }}
          >
            Add a file
          </Button>
        </div>
      </div>
      <div className="row" style={{ marginBottom: "1rem", backgroundColor: "#000000", color: "#fff" }}>
        <div className="col-6 text-uppercase fw-bold fs-4">Name</div>
        <div className="col-3 text-uppercase fw-bold fs-4">Update</div>
        <div className="col-3 text-uppercase fw-bold fs-4">Download</div>
      </div>
      <div className="row" style={{marginBottom: '0.5rem'}}>
        <div className="col-6 fs-5">Name</div>
        <div className="col-3">
            <div>
            <img src={edit} className="file-icons" alt="edit" />
            </div>
        </div>
        <div className="col-3">
            <div>
            <img src={download} className="file-icons" alt="download" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFiles;
