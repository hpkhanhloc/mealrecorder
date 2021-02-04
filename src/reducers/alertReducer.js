const initState = {
  alert: false,
  severity: "",
  alertMessage: "",
};
const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return action.payload;
    case "CLEAR_ALERT":
      return null;
    default:
      return state;
  }
};

export default alertReducer;
