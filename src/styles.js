import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const drawerWidth = 80;
const useStyles = () => {
  return makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: "fixed",
      background: (props) =>
        props.background === "true"
          ? "#FFFFFF"
          : "linear-gradient(135deg, #212121, #262626)",
    },
    drawer: {
      width: drawerWidth,
      position: "fixed",
      zIndex: theme.zIndex.drawer,
      flexShrink: 0,
    },
    drawerBackdrop: {
      zIndex: theme.zIndex.drawer - 1,
    },
    drawerPaperOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      width: theme.spacing(8),
      whiteSpace: "nowrap",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolBar: {
      height: 80,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    authButton: {
      fontWeight: "bold",
    },
    formControl: {
      padding: theme.spacing(2),
    },
    blogCard: {
      margin: theme.spacing(2),
    },
    splashScreen: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    card: {
      backgroundColor: "transparent",
      border: 0,
      boxShadow: "none",
      color: "white",
    },
    smallAvatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      fontSize: theme.spacing(2),
    },
    mediumAvatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      fontSize: theme.spacing(5),
    },
    largeAvatar: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      fontSize: theme.spacing(8),
    },
    uploadImagePopover: {
      padding: 10,
      maxWidth: 350,
    },
    userAvatarCard: {
      backgroundColor: "transparent",
      border: 0,
      boxShadow: "none",
      color: "white",
      padding: 0,
    },
    appBarLogo: {
      "&:hover": {
        cursor: "pointer",
      },
      margin: theme.spacing(1),
      flexDirection: "row",
      alignItems: "center",
    },
    homeCoverImage: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
  }));
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#eb3b5a",
    },
    warning: {
      main: "#fa8231",
    },
    info: {
      main: "#2d98da",
    },
    success: {
      main: "#20bf6b",
    },
  },
  typography: {
    fontFamily: "Merriweather",
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: "bold",
    },
    button: {
      fontWeight: "bold",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#eb3b5a",
    },
    warning: {
      main: "#fa8231",
    },
    info: {
      main: "#2d98da",
    },
    success: {
      main: "#20bf6b",
    },
    background: {
      default: "#212121",
      paper: "#262626",
    },
  },
  typography: {
    fontFamily: "Merriweather",
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: "bold",
    },
    button: {
      fontWeight: "bold",
    },
  },
});

export { useStyles, lightTheme, darkTheme };
