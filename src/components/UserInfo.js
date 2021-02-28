import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Typography,
  Popover,
  CardActions,
  Button,
  Box,
  List,
  ListItem,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SubjectIcon from "@material-ui/icons/Subject";
import { useStyles } from "../styles";
import Logout from "./Logout";

const UserInfo = (props) => {
  const { credential, profile } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles()();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    profile && (
      <>
        <Box className={classes.card} onClick={handlePopoverOpen}>
          <Avatar
            aria-label="userAvatar"
            src={profile.avatar}
            className={classes.smallAvatar}
          />
        </Box>
        <Popover
          id="user-control-panel"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Card>
            <CardHeader
              style={{ height: 64 }}
              avatar={
                <Avatar
                  aria-label="userAvatar"
                  src={profile.avatar}
                  className={classes.smallAvatar}
                />
              }
              title={
                <Typography variant="button" color="textPrimary">
                  {`${profile.firstName} ${profile.lastName}`}
                </Typography>
              }
            />
            <CardActions style={{ padding: 0 }}>
              <List style={{ height: "100%", width: "100%" }}>
                <ListItem>
                  <Button
                    href={`/user/${credential.uid}`}
                    startIcon={<PermIdentityIcon />}
                  >
                    User Info
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    href={`/diary/${credential.uid}`}
                    startIcon={<SubjectIcon />}
                  >
                    Diary
                  </Button>
                </ListItem>
                <ListItem>
                  <Logout />
                </ListItem>
              </List>
            </CardActions>
          </Card>
        </Popover>
      </>
    )
  );
};

export default UserInfo;
