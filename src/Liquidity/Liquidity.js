import React from "react";
import {
  Container,
  makeStyles,
  Paper,
} from "@material-ui/core";
import AddLiquidity from "./AddLiquidity";


const styles = (theme) => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    maxWidth: 420,
    height: 500,
    marginTop: "30px",
    margin: "auto",
    background: "#40303C",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  footer: {
    marginTop: "155px",
  },
});

const useStyles = makeStyles(styles);

function Liquidity(props) {
  const classes = useStyles();

  const [deploy, setDeploy] = React.useState(true);

 
  return (
    <div>
      <Container>
        <Paper className={classes.paperContainer}>
          <AddLiquidity network={props.network}/>
        </Paper>
      </Container>
      
    </div>
  );
}

export default Liquidity;
