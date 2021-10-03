import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button } from "@material-ui/core";
import axios from "axios";

const Navbar = () => {
  const [token, setToken] = useState({
    access_token: `${localStorage.getItem("accessToken")}`,
  });
  const [user, setUser] = useState([])
  useEffect(() => {
    axios.post(`http://localhost:5000/getUserInfo`, { token }).then((res) => {
      setUser(res.data)
    });
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token')
    window.location = '/'
  }

  return (
    <div>
      
      <nav
        className="navbar navbar-dark"
        style={{ height: "4rem", backgroundColor: "#000000" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fw-bolder fs-4">CLOUDPix</span>
          <img src={user.picture} style={{ position: "absolute", width: 50, marginLeft: '65rem', borderRadius: '50%' }}/>
             <div className="user-info">
              <p className="user-name" style={{ color:'#fff' ,  float: 'right', marginLeft: '58rem', marginTop: 10, fontWeight: 'bold' }}>{user.name}</p>
            </div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#551a8b",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
