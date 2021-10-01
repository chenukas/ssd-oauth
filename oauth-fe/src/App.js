import React, { Component } from "react";
import { Avatar, Grid, Paper, Button } from "@material-ui/core";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.navigate = this.navigate.bind(this);
  }

  navigate() {
    axios
      .get("http://localhost:5000/getAuthURL")
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
          }}
        >
          <Grid align="center">
            <Avatar src="/assests/lock.png"></Avatar>
            <h2>Sign In</h2>
          </Grid>
          <Button
            onClick={this.navigate}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={{ marginTop: "5%" }}
          >
            Sign In
          </Button>
        </Paper>
      </Grid>
    );
  }
}

export default Login;
