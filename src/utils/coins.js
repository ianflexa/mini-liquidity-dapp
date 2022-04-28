import * as chains from './chains';
import wBTC from '../assets/WBTC.png'
import USDC from '../assets/USDC.png'
import DAI from '../assets/DAI.png'
import LINK from '../assets/LINK.png'
import MATIC from '../assets/MATIC.svg'
import QUICK from '../assets/QUICK.png'
import ETH from '../assets/ETH.png'



const MUMBAICoins = [
    {
        "address": "0x0000000000000000000000000000000000000000",
        "decimals": 6,
        "abbr": "MATIC",
        "name": "MATIC",
        "icon": MATIC
    },
    {
        "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "decimals": 6,
        "abbr": "USDC",
        "name": "USDC",
        "icon": USDC
    },
    {
    "address": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    "decimals": 18,
    "abbr": "wBTC",
    "name": "Wrapped Bitcoin",
    "icon": wBTC
    },
    {
        "address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        "decimals": 18,
        "abbr": "ETH",
        "name": "Ether",
        "icon": ETH
    },
    {
        "address": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        "decimals": 18,
        "abbr": "LINK",
        "name": "ChainLink Token",
        "icon": LINK
    },
    {
        "address": "0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1",
        "decimals": 18,
        "abbr": "DAI",
        "name": "Dai Stablecoin",
        "icon": DAI
    }

]

const MATICTokens = [
    {
        "address": "0x0000000000000000000000000000000000000000",
        "decimals": 6,
        "abbr": "MATIC",
        "name": "MATIC",
        "icon": MATIC
    },
    {
        "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "decimals": 6,
        "abbr": "USDC",
        "name": "USDC",
        "icon": USDC
    },
    {
    "address": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    "decimals": 18,
    "abbr": "wBTC",
    "name": "Wrapped Bitcoin",
    "icon": wBTC
    },
    {
        "address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        "decimals": 18,
        "abbr": "ETH",
        "name": "Ether",
        "icon": ETH
    },
    {
        "address": "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
        "decimals": 18,
        "abbr": "QUICK",
        "name": "QuickSwap",
        "icon": QUICK
    },
    {
        "address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        "decimals": 18,
        "abbr": "DAI",
        "name": "Dai Stablecoin",
        "icon": DAI
    }
]

const COINS = new Map();

COINS.set(chains.ChainId.MATIC, MATICTokens)
COINS.set(chains.ChainId.MUMBAI, MUMBAICoins)
export default COINS

