import React, {useEffect, useState} from "react";
import "./styles.css";
import signin from '../../images/signin.svg';
import { useLocation } from "react-router";
import axios from "axios";

const Signin = (props) => {
  const [code, setCode] = useState(false);
  const [token, setToken] = useState("");
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const location = useLocation();

  const googleResponse = (response) => {
    axios
      .get(`http://localhost:5000/getAuthURL`)
      .then((res) => (window.location = `${res.data}`));
  };

  useEffect(() => {
    if (location?.search) {
      setCode(location.search?.split("=")[1]?.split("&")[0]);
      const key = new URLSearchParams(props.location.search).get("code");
      axios
        .post(`http://localhost:5000/getToken`, { code: key })
        .then((res) => {
          setToken(res.data);
          setCheck(true);
          localStorage.setItem("get", "get");
          localStorage.setItem("accessToken", res.data.access_token);
          window.location = "/files";
        });
    } else {
      setCode(false);
    }
  });


  return (
    <div className="container">
      <div className="row">
        <div className="col-8" style={{ marginTop: '6rem'}}>
            <div className="sign-topic">
                All your Photos
                <br/>
                in one place.
            </div>
            <div>
            <img src={signin} className="svg-icon" alt="signin" />
          </div>
        </div>
        <div className="col-4" style={{ marginTop: '10rem'}}>
          <div className="card-container1" style={{ width: "18rem" }}>
            <div className="fw-bold fs-4" style={{ textAlign: "left" }}>
              Welcome!
              <div className="fs-5 fw-normal">
                Login to your account or register with google
              </div>
            </div>
            <br/>
            <a
              className="btn btn-outline-dark"
              role="button"
              style={{ textTransform: "none" }}
              onClick={() => googleResponse()}
            >
              <img
                width="20px"
                style={{ marginBottom: "3px", marginRight: "5px" }}
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Signin with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
