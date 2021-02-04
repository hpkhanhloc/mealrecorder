import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { setAlert } from "../actions/alertActions";

const AUTOHIDE_DURATION = 10000;
const ELEVATION = 6;

const AlertSnackbar = () => {
  const alertController = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    dispatch(setAlert({ alert: false, severity: "info", alertMessage: "" }));
  };

  return (
    <Snackbar
      open={alertController.alert}
      autoHideDuration={AUTOHIDE_DURATION}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertController.severity}
        elevation={ELEVATION}
      >
        <AlertTitle>
          {alertController.severity
            ? alertController.severity[0].toUpperCase() +
              alertController.severity.slice(1)
            : ""}
        </AlertTitle>
        {alertController.alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
