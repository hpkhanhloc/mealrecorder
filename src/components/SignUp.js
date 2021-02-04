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
import { signUp } from "../actions/authActions";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.id]: event.target.value,
    });
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    dispatch(signUp(newUser));
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.authButton} onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>SignUp</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First name"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last name"
              onChange={handleChange}
              required
              fullWidth
            />
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
            <Button type="submit" onClick={handleSignUp} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SignUp;
