import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import { Avatar, Grid, Paper, Button } from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

class Login extends Component {
  googleResponse = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  render() {
    return (
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
            clientId="363721304981-jd62e1e42257jketsjbtmgngac4bssq8.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
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
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </Paper>
      </Grid>
    );
  }
}

export default Login;
