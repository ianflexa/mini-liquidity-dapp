import React from "react";
import { ButtonBase, Grid, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1.5),
    "&:hover, &$focusVisible": {
      backgroundColor: "#6d5e6a",
    },
    textAlign: "left"
  },
  coinName: {
    opacity: 0.6,
  },
  imgs: {
    width: "30px",
  }
}));

CoinButton.propTypes = {
  coinName: PropTypes.string.isRequired,
  coinAbbr: PropTypes.string.isRequired,
  coinIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function CoinButton(props) {
  const { coinName, coinAbbr, coinIcon, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <ButtonBase focusRipple className={classes.button} onClick={onClick}>
      <Grid container direction="column">
        <Typography variant="h6">
          
        {<><img src={coinIcon} alt="" className={classes.imgs}/></> } {coinAbbr} </Typography>
        
      </Grid>
    </ButtonBase>
  );
}
