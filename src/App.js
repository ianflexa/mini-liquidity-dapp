import React from "react";
import "./App.css";
import { ethers } from "ethers";
import Web3Provider from "./utils/network";
import { Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Liquidity from "./Liquidity/Liquidity";
import { createTheme, ThemeProvider } from "@material-ui/core";
import ConnectWalletPage from "./Components/connectWalletPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9e9e9e",
      contrastText: "#ffffff",
    },
  },
});

const App = () => {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <div>
            <Web3Provider
              render={(network) => (
                <div>
                  <div className="myform">
                  <ConnectWalletPage />
                  </div>
                  <Route exact path="/">
                    <Liquidity network={network} />
                  </Route>
                </div>
              )}
            ></Web3Provider>
          </div>
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
};

export default App;
