import React from "react";
import { Avatar, Grid, Paper, TextField, Button } from "@material-ui/core";
//import { LockIcon } from "@mui/icons-material";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
    border_radius: "10px",
  };
  return (
    <Grid>
      <Paper className="login-form" elevation={10} style={paperStyle}>
        <Grid className="login-grid" align="center">
          <Avatar>C</Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          id="outlined-basic"
          label="E-mail"
          placeholder="Enter email here"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          placeholder="Enter password here"
          variant="outlined"
          type="password"
          fullWidth
          required
          style={{ marginTop: "5%" }}
        />
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
