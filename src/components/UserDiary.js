import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Container,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import MomentUtils from "@date-io/moment";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { setAlert } from "../actions/alertActions";

const UserDiary = (props) => {
  const { credential } = props;
  const [selectedDate, setSelectedDate] = useState(moment());
  const [data, setData] = useState();
  const [dominentNutrition, setdominentNutrition] = useState();
  const [targetItem, setTargetItem] = useState();
  const userID = useParams().id;
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDate) {
      const recordID = `${credential.uid}_${selectedDate.format("DDMMYYYY")}`;
      firestore
        .collection("records")
        .doc(recordID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setData(data);
            setdominentNutrition([
              {
                name: "Protein",
                value: data.protein,
              },
              {
                name: "Fat",
                value: data.fat_total,
              },
              {
                name: "Carbohydrates",
                value: data.carbohydrates_total,
              },
            ]);
          } else {
            dispatch(
              setAlert({
                alert: true,
                severity: "warning",
                alertMessage: `There is not record. Please select another date!`,
              })
            );
          }
        });
    }
  }, [selectedDate]);

  if (!credential.uid || credential.uid !== userID) {
    dispatch(
      setAlert({
        alert: true,
        severity: "warning",
        alertMessage:
          "Access denied! You have not logged in or have not permission..",
      })
    );
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Paper>
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box m={2} display="flex" justifyContent="center">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                autoOk
                label="Select date"
                value={selectedDate}
                format="DD/MM/YYYY"
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => setSelectedDate(date)}
              />
            </MuiPickersUtilsProvider>
          </Box>
          {dominentNutrition && (
            <Chart data={dominentNutrition} width="100%" height="100%">
              <PieSeries argumentField="name" valueField="value" />
              <Legend />
              <Title text="Distribution of dominant nutrition" position="top" />
              <EventTracker />
              <Tooltip
                targetItem={targetItem}
                onTargetItemChange={setTargetItem}
              />
            </Chart>
          )}
          {data && (
            <>
              <Box display={{ xs: "flex", sm: "none" }} flexDirection="column">
                <Typography align="center">Other properties</Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>Calories</TableCell>
                      <TableCell align="right">
                        {Number(data.calories).toFixed(1)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>Sugar(g)</TableCell>
                      <TableCell align="right">
                        {Number(data.sugar).toFixed(1)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>Fiber(g)</TableCell>
                      <TableCell align="right">
                        {Number(data.fiber).toFixed(1)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>Sodium(mg)</TableCell>
                      <TableCell align="right">
                        {Number(data.sodium).toFixed(1)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>
                        Potassium(mg)
                      </TableCell>
                      <TableCell align="right">
                        {Number(data.potassium).toFixed(1)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>
                        Fat saturated(g)
                      </TableCell>
                      <TableCell align="right">
                        {Number(data.fat_saturated).toFixed(1)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>
                        Cholesterol(mg)
                      </TableCell>
                      <TableCell align="right">
                        {Number(data.cholesterol).toFixed(1)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box
                display={{ xs: "none", sm: "flex" }}
                flexDirection="column"
                justifyContent="center"
              >
                <Typography align="center">Other properties</Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Calories</TableCell>
                      <TableCell>Sugar(g)</TableCell>
                      <TableCell>Fiber(g)</TableCell>
                      <TableCell>Sodium(mg)</TableCell>
                      <TableCell>Potassium(mg)</TableCell>
                      <TableCell>Fat saturated(g)</TableCell>
                      <TableCell>Cholesterol(mg)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        {Number(data.calories).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(data.sugar).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(data.fiber).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(data.sodium).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(data.potassium).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(data.fat_saturated).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(data.cholesterol).toFixed(1)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDiary;
