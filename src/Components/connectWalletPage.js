import React, {useState} from "react";
import {
  Container,
  makeStyles,
  Paper,
  Typography,
  Button
} from "@material-ui/core";

const styles = (theme) => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    maxWidth: 700,
    margin: "auto",
    marginTop: "200px",
  },
  fullWidth: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "0 2px 0 0",
    marginBottom: theme.spacing(1),
    color: "white",
    borderRadius: theme.spacing(2),
    borderColor: "#705e70",
    borderWidth: "0.1px",
    borderStyle: "solid",
    background: "#463541",
    width:"250px",
    height: "30px"
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
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.4),
  },
  footer: {
    marginTop: "155px",
  },
});

const useStyles = makeStyles(styles);

const truncate = (input, len, len2) =>
  input.length > len? `${input.substring(0, len)}...${input.substring(38, len2)}` :
  input;


function ConnectWalletPage() {
  const [currentAccount, setCurrentAccount] = useState("")

  const connectWallet = async () => {
  
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  
    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Account: ", account);
        setCurrentAccount(account);
    } else {
        console.log("not authorized account");
    }
  }

  const classes = useStyles();
  return (
    <>
        {currentAccount === "" ? (
                <>
                    <Button  onClick={() => { connectWallet()}} className={classes.title}>Connect Wallet</Button>
                </>
            ) : (
                <>
                    <Button 
                    disabled={currentAccount !== "" ? 1 : 0}
                    onClick={(e) => { e.preventDefault(); }}
                    
                    >
                      <Typography  className={classes.title}>Connect to:  {truncate(currentAccount, 5, 42)}</Typography >
                    </Button>
                </>
            )}
    </>
  );
}

export default ConnectWalletPage;
