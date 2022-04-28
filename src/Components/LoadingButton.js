import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";


const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: 10,
    position: "relative",
    
  },
  buttons: {
    background: "#57D6F2",
    width: 390,
    height: 40,
    borderRadius: 10,
  },
  progress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function LoadingButton(props) {
  const classes = useStyles();
  const { children, loading, valid, success, fail, onClick, ...other } = props;
  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="#57D6F2"
        disabled={loading || !valid}
        type="submit"
        onClick={onClick}
        {...other}
        className={classes.buttons}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
}
