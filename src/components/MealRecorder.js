import React, { useState } from "react";
import { Box } from "@material-ui/core";
import FoodDetector from "./FoodDetector";
import NutritionTable from "./NutritionTable";

const MealRecorder = (props) => {
  const { credential } = props;
  const [foodLabels, setFoodLabels] = useState([]);

  return (
    <Box display="flex" flexDirection="column">
      <FoodDetector setFoodLabels={setFoodLabels} />
      <Box>
        <NutritionTable
          credential={credential}
          foodLabels={foodLabels}
          setFoodLabels={setFoodLabels}
        />
      </Box>
    </Box>
  );
};

export default MealRecorder;
