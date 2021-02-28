import { setAlert } from "./alertActions";

export const handleCreateOrUpdateRecord = (recordID, nutrition) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const docRef = firestore.collection("records").doc(recordID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const record = doc.data();
        const updatedRecord = {};
        Object.keys(record).forEach((key) => {
          if (typeof nutrition[key] !== "undefined") {
            updatedRecord[key] = nutrition[key] + record[key];
          } else {
            updatedRecord[key] = record[key];
          }
        });
        docRef
          .update({ ...updatedRecord, lastChanged: new Date() })
          .then(() => {
            dispatch(
              setAlert({
                alert: true,
                severity: "success",
                alertMessage: "Updated record!",
              })
            );
          })
          .catch((err) => {
            dispatch(
              setAlert({
                alert: true,
                severity: "error",
                alertMessage: `Update blog failed: ${err}`,
              })
            );
          });
      } else {
        docRef
          .set({
            ...nutrition,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
            lastChanged: new Date(),
          })
          .then(() => {
            dispatch(
              setAlert({
                alert: true,
                severity: "success",
                alertMessage: "Created record!",
              })
            );
          })
          .catch((err) => {
            dispatch(
              setAlert({
                alert: true,
                severity: "error",
                alertMessage: `Create record failed: ${err}`,
              })
            );
          });
      }
    });
  };
};
