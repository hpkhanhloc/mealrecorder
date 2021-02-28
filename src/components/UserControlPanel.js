import React, { useState } from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../actions/alertActions";
import { useStyles } from "../styles";
import { getFirebase } from "react-redux-firebase";
import UploadAvatarPopup from "./UploadAvatarPopup";
import { updateUserInformation } from "../actions/authActions";

const UserControlPanel = (props) => {
  const { credential, profile } = props;
  const [newPassword, setNewPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  const [newProfile, setNewProfile] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    password: profile.password,
  });
  const userID = useParams().id;
  const classes = useStyles()();
  const dispatch = useDispatch();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  const handleChange = (event) => {
    setNewProfile({ ...newProfile, [event.target.id]: event.target.value });
  };

  const handleUpdateUserInfo = () => {
    if (newPassword && retypePassword && newPassword !== retypePassword) {
      dispatch(
        setAlert({
          alert: true,
          severity: "warning",
          alertMessage: "New password and retype password are not matched.",
        })
      );
    } else {
      if (newPassword) {
        user
          .updatePassword(newPassword)
          .then(() => {
            dispatch(
              updateUserInformation(userID, {
                ...newProfile,
                password: newPassword,
              })
            );
          })
          .catch((error) => {
            dispatch(
              setAlert({
                alert: true,
                severity: "error",
                alertMessage: `Update password failed: ${error}`,
              })
            );
          });
      } else {
        dispatch(updateUserInformation(userID, newProfile));
      }
    }
  };

  if (!credential.uid || credential.uid !== userID) {
    dispatch(
      setAlert({
        alert: true,
        severity: "warning",
        alertMessage:
          "Access denied! You have not logged in or have not permission.",
      })
    );
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Paper>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item md={4} container justify="center" alignItems="center">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Avatar
                  aria-label="userAvatar"
                  className={classes.largeAvatar}
                  src={profile.avatar}
                />
                <UploadAvatarPopup userId={credential.uid} />
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              style={{ marginLeft: 2 }}
              item
              md={8}
              container
              direction="column"
              spacing={2}
            >
              <Grid item container spacing={8}>
                <Grid item>
                  <TextField
                    id="firstName"
                    label="First name"
                    defaultValue={profile.firstName}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="lastName"
                    label="Last name"
                    defaultValue={profile.lastName}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={8}>
                <Grid item>
                  <TextField
                    id="password"
                    label="New password"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="retypepassword"
                    label="Retype new password"
                    type="password"
                    value={retypePassword}
                    onChange={(event) => setRetypePassword(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={8}>
                <Grid item>
                  <TextField
                    label="Email"
                    defaultValue={profile.email}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Created at"
                    defaultValue={moment
                      .unix(credential.createdAt / 1000)
                      .format("MM/DD/YYYY")}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUserInfo}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserControlPanel;
