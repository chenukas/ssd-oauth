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
            style={{ backgroundColor: "#551a8b", color: "#fff", fontWeight: "bold" }}
          >
            Add a file
          </Button>
        </div>
      </div>
      <div className="row table-head" >
        <div className="col-6 fw-bold fs-4" style={{textAlign: 'left'}}>Name</div>
        <div className="col-3 fw-bold fs-4">Update</div>
        <div className="col-3 fw-bold fs-4">Download</div>
      </div>
      <div className="row" style={{marginBottom: '0.5rem', textAlign: 'center'}}>
        <div className="col-6 fs-5" style={{textAlign: 'left'}}>Name</div>
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
