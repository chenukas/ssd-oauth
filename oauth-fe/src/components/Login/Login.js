import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Avatar, Grid, Paper, Button } from "@material-ui/core";
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
          elevation={10}
          style={{
            padding: 50,
            height: "30vh",
            width: 280,
            margin: "80px auto",
            border_radius: "10px",
            //backgroundColor: "#000000",
          }}
        >
          <Grid align="center">
            <Avatar src="/assests/lock.png"></Avatar>
            <h2>Sign In</h2>
          </Grid>
          <GoogleLogin
            clientId="363721304981-jd62e1e42257jketsjbtmgngac4bssq8.apps.googleusercontent.com"
            buttonText="Sign In With Google"
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
