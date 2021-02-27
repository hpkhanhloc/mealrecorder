import React from "react";
import {
  CardMedia,
  CardContent,
  Box,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import MealRecorder from "./MealRecorder";
import { useStyles } from "../styles";
import Logo from "../static/logo.png";

const Home = (props) => {
  const { credential, profile } = props;
  const classes = useStyles()();
  return (
    <Container>
      {credential.uid ? (
        <MealRecorder credential={credential} profile={profile} />
      ) : (
        <>
          <Box display={{ xs: "none", sm: "flex" }}>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <CardMedia
                  className={classes.homeCoverImage}
                  image={Logo}
                  title="Home cover"
                />
              </Grid>
              <Grid item>
                <CardContent>
                  <Typography
                    variant="h4"
                    component="h2"
                    color="primary"
                    align="left"
                  >
                    Meal Recorder
                  </Typography>
                  <Typography variant="body1" color="primary" align="left">
                    AI application for tracking nutrition from food image
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
          <Box display={{ xs: "flex", sm: "none" }}>
            <Grid
              container
              direction="column"
              spacing={3}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <CardMedia
                  className={classes.homeCoverImage}
                  image={Logo}
                  title="Home cover"
                />
              </Grid>
              <Grid item>
                <CardContent>
                  <Typography
                    variant="h4"
                    component="h2"
                    color="primary"
                    align="center"
                  >
                    Meal Recorder
                  </Typography>
                  <Typography variant="body1" color="primary" align="center">
                    AI application for tracking nutrition from food image
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
