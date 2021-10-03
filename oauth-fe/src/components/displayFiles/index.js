import React from "react";
import './styles.css';
import { Button } from "@material-ui/core";
import download from '../../images/download.png';
import edit from '../../images/edit.png';
import add from '../../images/add.png';
import Navbar from "../Navbar";

const DisplayFiles = () => {
  return (
    <>
    <Navbar />
    <div className="container">
      <div className="row" style={{ marginBottom: "3rem", marginTop: "2rem" }}>
        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#551a8b", color: "#fff", fontWeight: "bold" }}
            className="btn-text"
            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
          >
            <img src={add} style={{ height: '0.8rem', width: '0.8rem' }} alt="add" />
            &nbsp; Add Photos
          </Button>
        </div>
      </div>

    {/* Modal */}
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add a new Photo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
            <div class="mb-3">
                <input class="form-control" type="file" id="formFileMultiple" multiple />
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-dark" style={{ backgroundColor: "#551a8b", color: "#fff", fontWeight: "bold" }}>
                Save
            </button>
        </div>
        </div>
    </div>
    </div>

      <div className="row table-head" >
        <div className="col-6 fw-bold fs-5" style={{textAlign: 'left', paddingLeft: '1rem'}}>Name</div>
        <div className="col-3 fw-bold fs-5">Update</div>
        <div className="col-3 fw-bold fs-5">Download</div>
      </div>
      <div className="row" style={{marginBottom: '0.5rem', textAlign: 'center', paddingLeft: '0.2rem'}}>
        <div className="col-6 fs-6" style={{textAlign: 'left'}}>Name</div>
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
    </>
  );
};

export default DisplayFiles;
