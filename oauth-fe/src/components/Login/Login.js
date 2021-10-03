import React, { useEffect, useState } from "react";
import "./Login.css";
import GoogleLogin from "react-google-login";
import { Grid, Paper, Button } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router";
import Files from "../displayFiles/";

const Login = (props) => {
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
    <div>
      {check === false ? (
        <Grid>
          <Paper
            elevation={20}
            style={{
              padding: 50,
              height: "30vh",
              width: 300,
              marginLeft: "950px",
              marginTop: "150px",
              borderRadius: "10px",
            }}
          >
            <Grid align="center" className="login-grid">
              <div className="fw-bold fs-4" style={{textAlign: "left"}}>
                Welcome!
                <div className="fs-5">Login to your account or register with google</div>
              </div>
            
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  onClick={googleResponse}
                  style={{
                    marginTop: "45px",
                    marginLeft: "10px",
                    size: "large",
                    variant: "contained",
                    backgroundColor: "#551a8b",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Sign In With Google
                </Button>
              )}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <Files token={token} />
      )}
    </div>
  );
};

export default Login;
