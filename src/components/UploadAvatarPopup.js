import React, { useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { storage } from "../config/fbConfig";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";

const UploadAvatarPopup = (props) => {
  const { userId } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    filename: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (event) => {
    setLoading(true);
    event.preventDefault();
    const src = await uploadAvatar(file, dispatch);
    dispatch(updateUserInformation(userId, { avatar: src }));
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Change avatar">
        <IconButton
          color="primary"
          aria-label="upload avatar"
          component="span"
          onClick={handleClickOpen}
        >
          <PhotoCameraIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogContent>
            <input
              id="avatar-upload-button"
              accept="image/*"
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
                setData({ ...data, filename: event.target.files[0].name });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleUpload}
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Upload"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const uploadAvatarToFirebase = (file, dispatch) => {
  return new Promise((resolve) => {
    const uploadTask = storage.ref(`avatars/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot) {
          case "paused":
            console.log("Upload is pause");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        dispatch(
          setAlert(
            setAlert({
              alert: true,
              severity: "error",
              alertMessage: error,
            })
          )
        );
      },
      () => {
        storage
          .ref("avatars")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            resolve(url);
          })
          .catch((error) =>
            dispatch(
              setAlert(
                setAlert({
                  alert: true,
                  severity: "error",
                  alertMessage: `Get image link failed: ${error}`,
                })
              )
            )
          );
      }
    );
  });
};

const uploadAvatar = async (file, dispatch) => {
  return new Promise(async (resolve, reject) => {
    const url = await uploadAvatarToFirebase(file, dispatch);
    if (!url) {
      reject();
      return;
    }
    resolve(url);
  });
};

export default UploadAvatarPopup;
