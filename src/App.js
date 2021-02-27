import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { useStyles, lightTheme, darkTheme } from "./styles";

import SiteNavigation from "./SiteNavigation";
import UserControlPanel from "./components/UserControlPanel";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Home from "./components/Home";
import AlertSnackbar from "./components/AlertSnackbar";

function App() {
  const classes = useStyles()();
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const [theme, setTheme] = useState();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setTheme(JSON.parse(localStorageTheme));
    } else {
      const systemReferenceTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      setTheme(systemReferenceTheme);
      localStorage.setItem("theme", JSON.stringify(systemReferenceTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <Router>
      {!isLoaded(auth) || !isLoaded(profile) ? (
        <Backdrop
          className={classes.splashScreen}
          open={!isLoaded(auth) || !isLoaded(profile)}
        >
          <CircularProgress size={100} />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
          <div className={classes.root}>
            <CssBaseline />
            <SiteNavigation
              credential={auth}
              profile={profile}
              theme={theme}
              setTheme={setTheme}
            />
            <main className={classes.content}>
              <div className={classes.toolBar} />
              <Switch>
                <Route exact path="/">
                  <Home credential={auth} profile={profile} />
                </Route>
                <Route exact path="/record">
                  <Home credential={auth} profile={profile} />
                </Route>
                <Route exact path="/user/:id">
                  <UserControlPanel credential={auth} profile={profile} />
                </Route>
              </Switch>
            </main>
            <AlertSnackbar />
          </div>
        </ThemeProvider>
      )}
    </Router>
  );
}

export default App;
