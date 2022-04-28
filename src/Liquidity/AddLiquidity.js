import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { addLiquidity, quoteAddLiquidity } from "./LiquidityFunctions";
import Field from "../Components/Field";
import Dialog from "../Components/Dialog";
import LoadingButton from "../Components/LoadingButton";
import WrongNetwork from "../Components/wrongNetwork";
import {
  getBalanceAndSymbol,
  getReserves,
} from "../utils/GlobalFunctions";

const styles = (theme) => ({
  fonts: {
    color: "white"
  },
  container2: {
    padding: theme.spacing(1),
    Height: "20px",
    backgroundColor: "#544551",
    borderRadius: theme.spacing(2),
    borderColor: "#705e70",
    borderWidth: "0.1px",
    borderStyle: "solid",
    color:"white"
  },
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    width: "100%",
    overflow: "wrap",
    background: "#544551",
    color: "white",
  },
  fullWidth: {
    width: "100%",
  },
  values: {
    width: "50%",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  hr: {
    width: "100%",
  },
  balance: {
    padding: theme.spacing(1),
    overflow: "wrap",
    textAlign: "center",
  },
  buttonIcon: {
    marginRight: theme.spacing(30),
    padding: theme.spacing(0.4),
    background: "#544551",
    textAlign: "center",  
  },
});

const useStyles = makeStyles(styles);

function AddLiquidity(props) {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  
  const [dialog1Open, setDialog1Open] = React.useState(false);
  const [dialog2Open, setDialog2Open] = React.useState(false);
  const [wrongNetworkOpen, setwrongNetworkOpen] = React.useState(false);


  const [coin1, setCoin1] = React.useState({
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });
  const [coin2, setCoin2] = React.useState({
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });


  const [reserves, setReserves] = React.useState(["0.0", "0.0"]);
  const [coin1PerCoin2, setcoin1PerCoin2] = useState("0.0")
  const [coin2PerCoin1, setcoin2PerCoin1] = useState("0.0")


  const [field1Value, setField1Value] = React.useState("");
  const [field2Value, setField2Value] = React.useState("");


  const [loading, setLoading] = React.useState(false);


  const [liquidityTokens, setLiquidityTokens] = React.useState("");


  const [liquidityOut, setLiquidityOut] = React.useState([0, 0, 0]);


  const switchFields = () => {
    let oldField1Value = field1Value;
    let oldField2Value = field2Value;

    setCoin1(coin2);
    setCoin2(coin1);
    setField1Value(oldField2Value);
    setField2Value(oldField1Value);
    setReserves(reserves.reverse());
    
  };


  const handleChange = {
    field1: (e) => {
      setField1Value(e.target.value);
    },
    field2: (e) => {
      setField2Value(e.target.value);
    },
  };


  const formatBalance = (balance) => {
    if (balance)
      return parseFloat(balance).toPrecision(8);
    else return "0.0";
  };


  const isButtonEnabled = () => {


    const parsedInput1 = parseFloat(field1Value);
    const parsedInput2 = parseFloat(field2Value);
    return (
      coin1.address &&
      coin2.address &&
      parsedInput1 !== NaN &&
      0 < parsedInput1 &&
      parsedInput2 !== NaN &&
      0 < parsedInput2 &&
      parsedInput1 <= coin1.balance &&
      parsedInput2 <= coin2.balance
    );
  };



  const deploy = () => {

    setLoading(true);

    addLiquidity(
      coin1.address,
      coin2.address,
      field1Value,
      field2Value,
      '0',
      '0',
      props.network.router,
      props.network.account,
      props.network.signer
    )
      .then(() => {
        setLoading(false);
        setField1Value("");
        setField2Value("");
        enqueueSnackbar("New Liquidity Supply Successful", { variant: "success" });
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar("Suplly Liquidity Failed (" + e.message + ")", {
          variant: "error",
          autoHideDuration: 10000,
        });
      });
  };


  const onToken1Selected = (address) => {
    setDialog1Open(false);

    if (address === coin2.address) {
      switchFields();
    } else if (address) {
      getBalanceAndSymbol(
        props.network.account,
        address,
        props.network.provider,
        props.network.signer,
        props.network.weth.address,
        props.network.coins
        ).then((data) => {
        setCoin1({
          address: address,
          symbol: data.symbol,
          balance: data.balance,
        });
      });
    }
  };


  const onToken2Selected = (address) => {

    setDialog2Open(false);

    if (address === coin1.address) {
      switchFields();
    }

    else if (address) {

      getBalanceAndSymbol(props.network.account,
        address,
        props.network.provider,
        props.network.signer,
        props.network.weth.address,
        props.network.coins
        ).then((data) => {
        setCoin2({
          address: address,
          symbol: data.symbol,
          balance: data.balance,
        });
      });
    }
  };


  useEffect(() => {
    console.log(
      "Trying to get reserves between:\n" + coin1.address + "\n" + coin2.address
    );

    if (coin1.address && coin2.address && props.network.account) {
      getReserves(
        coin1.address,
        coin2.address,
        props.network.factory,
        props.network.signer,
        props.network.account
        ).then(
        (data) => {
          setReserves([data[0], data[1]]);
          setLiquidityTokens(data[2]);
          let onePerTwo = data[0] / data[1]
          let twoPerOne = data[1] / data[0]
          setcoin1PerCoin2(onePerTwo)
          setcoin2PerCoin1(twoPerOne)
        }
      );
    }
  }, [coin1.address, coin2.address, props.network.account, props.network.factory, props.network.signer]);

  useEffect(() => {
    if (isButtonEnabled()) {
      console.log("Trying to preview the liquidity deployment");

      quoteAddLiquidity(
        coin1.address,
        coin2.address,
        field1Value,
        field2Value,
        props.network.factory,
        props.network.signer
      ).then((data) => {
        console.log("TokenA in: ", data[0]);
        console.log("TokenB in: ", data[1]);
        console.log("Liquidity out: ", data[2]);
        setLiquidityOut([data[0], data[1], data[2]]);
      });
    }
  }, [coin1.address, coin2.address, field1Value, field2Value, props.network.factory, props.network.signer]);

  useEffect(() => {
    const coinTimeout = setTimeout(() => {
      console.log("Checking balances & Getting reserves...");

      if (coin1.address && coin2.address && props.network.account) {
        getReserves(
          coin1.address,
          coin2.address,
          props.network.factory,
          props.network.signer,
          props.network.account
        ).then((data) => {
          setReserves([data[0], data[1]]);
          setLiquidityTokens(data[2]);
        });
      }

      if (coin1.address && props.network.account &&!wrongNetworkOpen) {
        getBalanceAndSymbol(
          props.network.account,
          coin1.address,
          props.network.provider,
          props.network.signer,
          props.network.weth.address,
          props.network.coins
          ).then(
          (data) => {
            setCoin1({
              ...coin1,
              balance: data.balance,
            });
          }
        );
      }
      if (coin2.address && props.network.account &&!wrongNetworkOpen) {
        getBalanceAndSymbol(
          props.network.account,
          coin2.address,
          props.network.provider,
          props.network.signer,
          props.network.weth.address,
          props.network.coins
          ).then(
          (data) => {
            setCoin2({
              ...coin2,
              balance: data.balance,
            });
          }
        );
      }
    }, 10000);

    return () => clearTimeout(coinTimeout);
  });

  return (
    <div className={classes.fonts}>
      {/* Liquidity deployer */}
      <Typography variant="h6" className={classes.title}>Provide Liquidity</Typography>

      {/* Dialog Windows */}
      <Dialog
        open={dialog1Open}
        onClose={onToken1Selected}
        coins={props.network.coins}
        signer={props.network.signer}
      />
      <Dialog
        open={dialog2Open}
        onClose={onToken2Selected}
        coins={props.network.coins}
        signer={props.networksigner}
      />
      <WrongNetwork
        open={wrongNetworkOpen}
      />

      <Grid container direction="column" alignItems="center" spacing={2} >

        <Grid item  xs={12} className={classes.fullWidth}>
            <Paper className={classes.container2}  >  
              <Field
                activeField={true}
                value={field1Value}
                onClick={() => setDialog1Open(true)}
                onChange={handleChange.field1}
                
                symbol={coin1.symbol !== undefined ? coin1.symbol : "Select"}/>
              Balance: {formatBalance(coin1.balance)}
            </Paper>
        </Grid>
        <Grid  item xs={12} className={classes.fullWidth}>
        <Paper className={classes.container2} >
          <Field
            activeField={true}
            value={field2Value}
            onClick={() => setDialog2Open(true)}
            onChange={handleChange.field2}
            symbol={coin2.symbol !== undefined ? coin2.symbol : "Select"}
          />
          Balance: {formatBalance(coin2.balance)}
          </Paper>
        </Grid>
      </Grid>
      {/* <hr className={classes.hr} /> */}
      <Grid container direction="column" alignItems="center" spacing={2}>
        <LoadingButton
          loading={loading}
          valid={isButtonEnabled()}
          success={false}
          fail={false}
          onClick={deploy}
        >
          supply
        </LoadingButton>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
        className={classes.balance}
      >
        <hr className={classes.hr} />
      </Grid>
      <Paper className={classes.paperContainer}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.balance}>
                {/* formatReserve(reserves[0], coin1.symbol) */}
                {parseFloat(coin1PerCoin2).toFixed(8)} 
              </Typography>
              <Typography variant="body1" className={classes.balance}>
                {coin1.symbol} PER {coin2.symbol}
                </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.balance}>
                {/* formatReserve(reserves[1], coin2.symbol) */}
                {parseFloat(coin2PerCoin1).toFixed(8)}
              </Typography>
              <Typography variant="body1" className={classes.balance}>
                {/* formatReserve(reserves[1], coin2.symbol) */}
                {coin2.symbol} PER {coin1.symbol}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
    </div>
  );
}

export default AddLiquidity;
