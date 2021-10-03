import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import { Avatar, Grid, Paper, Button } from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useLocation } from "react-router";
import Files from "../displayFiles/index";

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
    console.log(location.search);
    if (location?.search) {
      setCode(location.search?.split("=")[1]?.split("&")[0]);
      console.log(props.location);
      const key = new URLSearchParams(props.location.search).get("code");
      console.log(key);
      axios
        .post(`http://localhost:5000/getToken`, { code: key })
        .then((res) => {
          console.log(res.data);
          setToken(res.data);
          setCheck(true);
          localStorage.setItem("get", "get");
          localStorage.setItem("accessToken", res.data.access_token);
          window.location = "/files";
        });
      //localStorage.setItem("token", token);
      //console.log(token);
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
              border_radius: "10px",
            }}
          >
            <Grid align="center">
              <Avatar sx={{ width: 60, height: 60 }}>
                <LockIcon
                  marginTop="40px"
                  sx={{ color: "#551a8b" }}
                  fontSize="large"
                />
              </Avatar>
            </Grid>
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
          </Paper>
        </Grid>
      ) : (
        <Files token={token} />
      )}
    </div>
  );
};

export default Login;
