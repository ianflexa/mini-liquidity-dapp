import React from "react";
import { Fab, Grid, InputBase, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import * as COLORS from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    minHeight: "62px",
    backgroundColor: "#544551",
    color:"white"
  },
  container_input: {
    color:"white",
    padding: theme.spacing(1),
    minHeight: "60px",
    backgroundColor: COLORS.grey[50],
    borderRadius: theme.spacing(1),
    borderColor: COLORS.grey[300],
    borderWidth: "5px",
    borderStyle: "solid",
    marginLeft: "20%",
    textAlign: "right",
  },
  container_blank: {
    color:"white",
    padding: theme.spacing(1),
    minHeight: "40px",
    borderRadius: theme.spacing(2),
  },
  grid: {
    color:"white",
    height: "60px",
  },
  fab: {
    zIndex: "0",
    background: "#463541",
  },
  input: {
    ...theme.typography.h5,
    width: "100%",
    height: "20px"
  },
  inputBase: {
    textAlign: "left",
    height: "20px"
  },
  imgs: {
    width: "25px"
  }
}));

CoinField.propTypes = {
  onClick: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  activeField: PropTypes.bool.isRequired,
  coinIcon: PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired,
};



export default function CoinField(props) {
  const classes = useStyles();
  const { onClick, symbol, value, onChange, coinIcon, activeField, coins, ...others } = props;

  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item xs={9}>
          <InputBase
            value={value}
            onChange={onChange}
            placeholder="0.0"
            disabled={!activeField}
            classes={{ root: classes.input, input: classes.inputBase }}
          />
        </Grid>
          <Grid item xs={3}>
            <Fab
            size="small"
            variant="extended"
            onClick={onClick}
            className={classes.fab}
          >
            {symbol} 
            <ExpandMoreIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}
