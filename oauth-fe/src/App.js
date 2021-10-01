import React from "react";
import { Avatar, Grid, Paper, TextField, Button } from "@material-ui/core";

const Login = () => {
  const paperStyle = {
    padding: 50,
    height: "50vh",
    width: 280,
    margin: "80px auto",
    border_radius: "10px",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar src="/assests/lock.png"></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Button
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
};

export default Login;
