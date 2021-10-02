import React from "react";
import './styles.css';
import { Button } from "@material-ui/core";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-dark" style={{height: '4rem', backgroundColor: '#000000' }}>
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 fw-bolder fs-4">CLOUDPix</span>
          <Button
            variant="contained"
            style={{ backgroundColor: "#551a8b", color: "#fff", fontWeight: "bold" }}
          >
            Log Out
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
