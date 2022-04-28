import React from "react";
import {
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  withStyles,
  Paper,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Button from "./Button";
import PropTypes from "prop-types";


const styles = (theme) => ({
  dialogContainer: {
    borderRadius: theme.spacing(2),
    backgroundColor: "#40303C",
    width: "470px",
    height: "500px",
    color: "white",
    justifyContent: "left",
  },
  titleSection: {
    padding: theme.spacing(2),
  },
  titleText: {
    color: "white",
    alignSelf: "center",
  },
  hr: {
    margin: 0,
  },
  address: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
    justifyContent: "left",
    
  },
  coinList: {
    color: "white",
    height: "50px",
    backgroundColor: "#544551",
    justifyContent: "space-between",
    margin: "2px 2px 0px 2px",
    textAlign: "left",
    "&:hover, &$focusVisible": {
      backgroundColor: "#6d5e6a",
    },
  },
  coinContainer: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    overflow: "hidden",
  },
  imgs: {
    width: "30px"
  }
});

const useStyles = makeStyles(styles);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.titleSection}
      {...other}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignContent="normal"
      >
        <Typography variant="h6" className={classes.titleText}>
          {children}
        </Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Grid>
    </MuiDialogTitle>
  );
});

CoinDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
};

export default function CoinDialog(props) {

  const classes = useStyles();
  const { onClose, open, coins, signer, ...others } = props;

  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");

  const exit = (value) => {
    setError("");
    setAddress("");
    onClose(value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => exit(undefined)}
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.dialogContainer }}
    >
      <DialogTitle onClose={() => exit(undefined)}>Select a Token</DialogTitle>
      

      <div className={classes.coinContainer}>
        <Grid container direction="column" spacing={1} alignContent="normal" >
        {coins.map((coin, index) => (
                <Grid item key={index} xs={12} >
                  <Paper className={classes.coinList}>
                    <Button
                      coinIcon={coin.icon}
                      coinAbbr={coin.abbr}
                      onClick={() => exit(coin.address)}
                    />
                  </Paper>
                </Grid>
              ))}
        </Grid>
      </div>

    </Dialog>
  );
}
