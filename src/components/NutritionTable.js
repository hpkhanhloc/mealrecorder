import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Table,
  TableCell,
  TableRow,
  TextField,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setAlert } from "../actions/alertActions";
import { API_KEY } from "../env/calorieNinjas";

const NutritionTable = (props) => {
  const { foodLabels, setFoodLabels } = props;
  const [nutrition, setNutrition] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const config = {
    headers: { "X-Api-Key": API_KEY },
  };

  const handleGetNutritionData = async () => {
    if (foodLabels.length > 0) {
      setLoading(true);
      await axios
        .get(createQuery(foodLabels), config)
        .then((response) => {
          const deserts = response.data.items;
          const totalNutrition = deserts.reduce((acc, item) => {
            return {
              calories: acc.calories ? acc.calories : 0 + item.calories,
              sugar: acc.sugar_g ? acc.sugar_g : 0 + item.sugar_g,
              fiber: acc.fiber_g ? acc.fiber_g : 0 + item.fiber_g,
              sodium: acc.sodium_mg ? acc.sodium_mg : 0 + item.sodium_mg,
              potassium: acc.potassium_mg
                ? acc.potassium_mg
                : 0 + item.potassium_mg,
              fat_saturated: acc.fat_saturated_g
                ? acc.fat_saturated_g
                : 0 + item.fat_saturated_g,
              fat_total: acc.fat_total_g ? acc.calories : 0 + item.fat_total_g,
              cholesterol: acc.cholesterol_mg
                ? acc.cholesterol_mg
                : 0 + item.cholesterol_mg,
              protein: acc.protein_g ? acc.protein_g : 0 + item.protein_g,
              carbohydrates_total: acc.carbohydrates_total_g
                ? acc.carbohydrates_total_g
                : 0 + item.carbohydrates_total_g,
            };
          }, {});
          setNutrition(totalNutrition);
        })
        .catch((error) => {
          dispatch(
            setAlert({
              alert: true,
              severity: "error",
              alertMessage: error,
            })
          );
        });
      setLoading(false);
    }
  };

  const createQuery = (foodLabels) => {
    const url = `https://api.calorieninjas.com/v1/nutrition?query=${foodLabels
      .map(
        (food) => `${food?.quantity ? food.quantity + " " : ""}${food.label}`
      )
      .join(" and ")}`;
    return url;
  };

  const handleChangeQuantity = (event) => {
    setFoodLabels(
      foodLabels.map((food) =>
        food.label === event.target.name
          ? { ...food, quantity: event.target.value }
          : food
      )
    );
  };

  return (
    <>
      {foodLabels.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {foodLabels.map((food) => {
            return (
              <Box key={food.label} m={1}>
                <Grid container direction="row" spacing={3}>
                  <Grid item xs container justify="flex-end">
                    <TextField
                      label="Quantity"
                      name={food.label}
                      value={food.quantity ? food.quantity : ""}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChangeQuantity}
                    />
                  </Grid>
                  <Grid item xs container justify="flex-start">
                    <TextField
                      label="Food"
                      value={food.label}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            );
          })}
          <Box display={{ xs: "none", sm: "flex" }} style={{ marginRight: 50 }}>
            <Box m={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetNutritionData}
                disabled={loading}
              >
                Get Nutrition
                {loading && <CircularProgress size={16} />}
              </Button>
            </Box>
            <Box m={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading || !nutrition}
              >
                Record
              </Button>
            </Box>
          </Box>
          <Box display={{ xs: "flex", sm: "none" }}>
            <Grid component={Box} container direction="row">
              <Grid item xs={8} container>
                <Box m={1}>
                  <Button
                    style={{ marginLeft: -20 }}
                    variant="contained"
                    color="primary"
                    onClick={handleGetNutritionData}
                    disabled={loading}
                  >
                    Get Nutrition
                    {loading && <CircularProgress size={16} />}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={4} container>
                <Box m={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading || !nutrition}
                  >
                    Record
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {nutrition && (
        <>
          <Box display={{ xs: "flex", sm: "none" }}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Calories</TableCell>
                    <TableCell align="right">{nutrition.calories}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Sugar(g)</TableCell>
                    <TableCell align="right">{nutrition.sugar}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Fiber(g)</TableCell>
                    <TableCell align="right">{nutrition.fiber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Sodium(mg)</TableCell>
                    <TableCell align="right">{nutrition.sodium}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Potassium(mg)</TableCell>
                    <TableCell align="right">{nutrition.potassium}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>
                      Fat saturated(g)
                    </TableCell>
                    <TableCell align="right">
                      {nutrition.fat_saturated}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Fat total(g)</TableCell>
                    <TableCell align="right">{nutrition.fat_total}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>
                      Cholesterol(mg)
                    </TableCell>
                    <TableCell align="right">{nutrition.cholesterol}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>Protein(g)</TableCell>
                    <TableCell align="right">{nutrition.protein}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 200 }}>
                      Carbohydrates total(g)
                    </TableCell>
                    <TableCell align="right">
                      {nutrition.carbohydrates_total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box display={{ xs: "none", sm: "flex" }}>
            <TableContainer component={Paper}>
              <TableBody>
                <TableRow>
                  <TableCell>Calories</TableCell>
                  <TableCell>Sugar(g)</TableCell>
                  <TableCell>Fiber(g)</TableCell>
                  <TableCell>Sodium(mg)</TableCell>
                  <TableCell>Potassium(mg)</TableCell>
                  <TableCell>Fat saturated(g)</TableCell>
                  <TableCell>Fat total(g)</TableCell>
                  <TableCell>Cholesterol(mg)</TableCell>
                  <TableCell>Protein(g)</TableCell>
                  <TableCell>Carbohydrates total(g)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">{nutrition.calories}</TableCell>
                  <TableCell align="center">{nutrition.sugar}</TableCell>
                  <TableCell align="center">{nutrition.fiber}</TableCell>
                  <TableCell align="center">{nutrition.sodium}</TableCell>
                  <TableCell align="center">{nutrition.potassium}</TableCell>
                  <TableCell align="center">
                    {nutrition.fat_saturated}
                  </TableCell>
                  <TableCell align="center">{nutrition.fat_total}</TableCell>
                  <TableCell align="center">{nutrition.cholesterol}</TableCell>
                  <TableCell align="center">{nutrition.protein}</TableCell>
                  <TableCell align="center">
                    {nutrition.carbohydrates_total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
          </Box>
        </>
      )}
    </>
  );
};

export default NutritionTable;