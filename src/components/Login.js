import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { useDispatch } from "react-redux";
import { logIn } from "../actions/authActions";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [credential, setCredential] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.id]: event.target.value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(logIn(credential));
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.authButton} onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              onChange={handleChange}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Login;
