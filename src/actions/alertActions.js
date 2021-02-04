export const setAlert = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_ALERT",
      payload: {
        alert: message.alert,
        severity: message.severity,
        alertMessage: message.alertMessage,
      },
    });
  };
};

export const clearAlert = () => {
  return async (dispatch) => {
    dispatch({
      type: "CLEAR_ALERT",
    });
  };
};
