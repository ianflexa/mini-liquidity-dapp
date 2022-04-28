import { Contract, ethers } from "ethers";
import { fetchReserves, getDecimals } from "../utils/GlobalFunctions";
import ERC20 from "@uniswap/v2-periphery/build/ERC20.json"
import PAIR from "@uniswap/v2-periphery/build/IUniswapV2Pair.json"


export async function addLiquidity(
  address1,
  address2,
  amount1,
  amount2,
  amount1min,
  amount2min,
  routerContract,
  account,
  signer
) {
  const token1 = new Contract(address1, ERC20.abi, signer);
  const token2 = new Contract(address2, ERC20.abi, signer);

  const token1Decimals = await getDecimals(token1);
  const token2Decimals = await getDecimals(token2);

  const amountIn1 = ethers.utils.parseUnits(amount1, token1Decimals);
  const amountIn2 = ethers.utils.parseUnits(amount2, token2Decimals);

  const amount1Min = ethers.utils.parseUnits(amount1min, token1Decimals);
  const amount2Min = ethers.utils.parseUnits(amount2min, token2Decimals);

  const time = Math.floor(Date.now() / 1000) + 200000;
  const deadline = ethers.BigNumber.from(time);

  await token1.approve(routerContract.address, amountIn1);
  await token2.approve(routerContract.address, amountIn2);

  const wethAddress = await routerContract.WETH();

  console.log([
    address1,
    address2,
    amountIn1,
    amountIn2,
    amount1Min,
    amount2Min,
    account,
    deadline,
  ]);

  if (address1 === wethAddress) {
    
    await routerContract.addLiquidityETH(
      address2,
      amountIn2,
      amount2Min,
      amount1Min,
      account,
      deadline,
      { value: amountIn1 }
    );
  } else if (address2 === wethAddress) {
    
    await routerContract.addLiquidityETH(
      address1,
      amountIn1,
      amount1Min,
      amount2Min,
      account,
      deadline,
      { value: amountIn2 }
    );
  } else {
    // Token + Token
    await routerContract.addLiquidity(
      address1,
      address2,
      amountIn1,
      amountIn2,
      amount1Min,
      amount2Min,
      account,
      deadline
    );
  }
}

const quote = (amount1, reserve1, reserve2) => {
  const amount2 = amount1 * (reserve2 / reserve1);
  return [amount2];
};

async function quoteMintLiquidity(
  address1,
  address2,
  amountA,
  amountB,
  factory,
  signer
){
  const MINIMUM_LIQUIDITY = 1000;
  let _reserveA = 0;
  let _reserveB = 0;
  let totalSupply = 0;
  [_reserveA, _reserveB, totalSupply] = await factory.getPair(address1, address2).then(async (pairAddress) => {
    if (pairAddress !== '0x0000000000000000000000000000000000000000'){
      const pair = new Contract(pairAddress, PAIR.abi, signer);

      const reservesRaw = await fetchReserves(address1, address2, pair, signer); 

      const reserveA = reservesRaw[0];
      const reserveB = reservesRaw[1];
    
      const _totalSupply = await pair.totalSupply();
      const totalSupply = Number(ethers.utils.formatEther(_totalSupply));
      return [reserveA, reserveB, totalSupply]
    } else {
      return [0,0,0]
    }
  });

  const token1 = new Contract(address1, ERC20.abi, signer);
  const token2 = new Contract(address2, ERC20.abi, signer);

  const token1Decimals = await getDecimals(token1);
  const token2Decimals = await getDecimals(token2);

  const valueA = amountA*(10**token1Decimals);
  const valueB = amountB*(10**token2Decimals);

  const reserveA = _reserveA*(10**token1Decimals);
  const reserveB = _reserveB*(10**token2Decimals);

  if (totalSupply == 0){
    return Math.sqrt(((valueA * valueB)-MINIMUM_LIQUIDITY))*10**(-18);
  };
  
  return (
    Math.min(valueA*totalSupply/reserveA, valueB*totalSupply/reserveB)
  );
};

export async function quoteAddLiquidity(
  address1,
  address2,
  amountADesired,
  amountBDesired,
  factory,
  signer
) {

  const pairAddress = await factory.getPair(address1, address2);
  const pair = new Contract(pairAddress, PAIR.abi, signer);

  const reservesRaw = await fetchReserves(address1, address2, pair, signer); // Returns the reserves already formated as ethers
  const reserveA = reservesRaw[0];
  const reserveB = reservesRaw[1];

  if (reserveA === 0 && reserveB === 0) {
    const amountOut = await quoteMintLiquidity(
      address1,
      address2,
      amountADesired,
      amountBDesired,
      factory,
      signer);
    return [
      amountADesired,
      amountBDesired,
      amountOut.toPrecision(8),
    ];
  } else {
    const amountBOptimal = quote(amountADesired, reserveA, reserveB);
    if (amountBOptimal <= amountBDesired) {
      const amountOut = await quoteMintLiquidity(
        address1,
        address2,
        amountADesired,
        amountBOptimal,
        factory,
        signer);
      return [
        amountADesired,
        amountBOptimal,
        amountOut.toPrecision(8),
      ];
    } else {
      const amountAOptimal = quote(
        amountBDesired,
        reserveB,
        reserveA
      );
      const amountOut = await quoteMintLiquidity(
        address1,
        address2,
        amountAOptimal,
        amountBDesired,
        factory,
        signer);
      return [
        amountAOptimal,
        amountBDesired,
        amountOut.toPrecision(8),
      ];
    }
  }
}

