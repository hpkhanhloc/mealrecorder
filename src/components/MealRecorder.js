import React, { useState } from "react";
import { Box } from "@material-ui/core";
import FoodDetector from "./FoodDetector";
import NutritionTable from "./NutritionTable";

const MealRecorder = (props) => {
  const { credential, profile } = props;
  const [foodLabels, setFoodLabels] = useState([]);

  return (
    <Box display="flex" flexDirection="column">
      <FoodDetector setFoodLabels={setFoodLabels} />
      <Box>
        <NutritionTable foodLabels={foodLabels} setFoodLabels={setFoodLabels} />
      </Box>
    </Box>
  );
};

export default MealRecorder;
