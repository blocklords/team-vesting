import { IChainData } from "./types";

const supportedChains: IChainData[] = [
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed.binance.org/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Goerli test network",
    short_name: "goerli",
    chain: "smartchain",
    network: "testnet",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://goerli.infura.io/v3/",
    native_currency: {
      symbol: "GoerliETH",
      name: "GoerliETH",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
];

export default supportedChains;
