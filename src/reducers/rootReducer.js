import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  alert: alertReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
