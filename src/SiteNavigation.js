import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Drawer,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Backdrop,
  Divider,
} from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserInfo from "./components/UserInfo";
import MenuIcon from "@material-ui/icons/Menu";
import AppBarLogo from "./static/logo.png";

const SiteNavigation = (props) => {
  const { credential, profile, theme, setTheme } = props;
  const themeIcon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const classes = useStyles()();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const CustomAppBar = (props) => {
    const classes = useStyles()(props);
    return <AppBar className={classes.appBar} {...props} />;
  };
  CustomAppBar.muiName = AppBar.muiName;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangeTheme = (event) => {
    event.preventDefault();
    setTheme(!theme);
  };

  return (
    <>
      <CustomAppBar background={theme.toString()}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item container xs={7} sm={6} alignItems="center">
              <Box
                onClick={() => history.push("/")}
                display="flex"
                className={classes.appBarLogo}
              >
                <Avatar
                  aria-label="appbarAvatar"
                  className={classes.mediumAvatar}
                  variant="rounded"
                  src={AppBarLogo}
                />
                <Typography
                  color="textPrimary"
                  variant="h6"
                  noWrap
                  style={{ marginLeft: 8 }}
                >
                  Meal Recorder
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              sm={6}
              container
              spacing={1}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="theme mode"
                  onClick={handleChangeTheme}
                >
                  {themeIcon}
                </IconButton>
              </Grid>
              <Grid item>
                <Box display={{ xs: "none", sm: "flex" }}>
                  {credential.uid ? (
                    <Grid item>
                      <UserInfo credential={credential} profile={profile} />
                    </Grid>
                  ) : (
                    <>
                      <Grid item>
                        <Login />
                      </Grid>
                      <Grid item>
                        <SignUp />
                      </Grid>
                    </>
                  )}
                </Box>
                <Box display={{ xs: "flex", sm: "none" }}>
                  {credential.uid ? (
                    <Grid item>
                      <UserInfo credential={credential} profile={profile} />
                    </Grid>
                  ) : (
                    <Tooltip title="Navigation menu">
                      <IconButton
                        aria-label="toggle drawer"
                        onClick={handleDrawerToggle}
                        style={{ marginRight: -18 }}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </CustomAppBar>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerPaperOpen]: open,
          [classes.drawerPaperClose]: !open,
        })}
        variant="persistent"
        anchor="right"
        classes={{
          paper: clsx({
            [classes.drawerPaperOpen]: open,
            [classes.drawerPaperClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolBar} />
        <Divider />
        <Grid>
          <Grid item>
            <Login />
          </Grid>
          <Grid item>
            <SignUp />
          </Grid>
        </Grid>
      </Drawer>
      <Backdrop
        open={open}
        onClick={handleDrawerClose}
        className={classes.drawerBackdrop}
      />
    </>
  );
};

export default SiteNavigation;
