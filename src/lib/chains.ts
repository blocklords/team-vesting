import { IChainData } from "./types";

const supportedChains: IChainData[] = [
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed1.defibit.io/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed1.defibit.io/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Binance Smart Chain Testnet",
    short_name: "bsc",
    chain: "smartchain",
    network: "testnet",
    chain_id: 97,
    network_id: 97,
    rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    native_currency: {
      symbol: "BSC",
      name: "BSC",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
];

export default supportedChains;
