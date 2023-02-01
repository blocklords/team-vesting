import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';

export function numberWithCommas(n: number) {
    var parts = n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

export const loadContract = async (filename: string, address: string) => {
    const abi = require(`./abi/${filename}.json`);
    const web3 = new Web3(Web3.givenProvider);
    return new web3.eth.Contract(abi, address);
}

export const configureMoonbaseAlpha = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true }) as any;
    if (provider) {
        console.log(provider, 'provider');
        try {
            await provider.request({ method: "eth_requestAccounts" });
            const activeChain = process.env.REACT_APP_ACTIVE_CHAIN as string;
            console.log(typeof activeChain, 'activeChain');
            switch (activeChain) {
                case '4':
                    console.log('change to rinkeby')
                    await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x4" }]
                    });
                    break;
                case '1287':
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x507",
                                chainName: "Moonbase Alpha",
                                nativeCurrency: {
                                    name: 'DEV',
                                    symbol: 'DEV',
                                    decimals: 18
                                },
                                rpcUrls: ["https://rpc.testnet.moonbeam.network"],
                                blockExplorerUrls: ["https://moonbase-blockscout.testnet.moonbeam.network/"]
                            },
                        ]
                    })
                    await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x507" }]
                    });
                    break;
                case '1285':
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x505",
                                chainName: "Moonriver",
                                nativeCurrency: {
                                    name: 'MOVR',
                                    symbol: 'MOVR',
                                    decimals: 18
                                },
                                rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
                                blockExplorerUrls: ["https://blockscout.moonriver.moonbeam.network/"]
                            },
                        ]
                    })
                    await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x505" }]
                    });
                    break;

                default:
                    break;
            }
        } catch (e) {
            console.error(e);
        }

        provider.on("chainChanged", () => {
            window.location.reload()
        })
    } else {
        console.error("Please install MetaMask");
    }
}

export const configureBSC = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true }) as any;
    if (provider) {
        console.log(provider, 'provider');
        try {
            await provider.request({ method: "eth_requestAccounts" });
            const activeChain = process.env.REACT_APP_ACTIVE_CHAIN as string;
            console.log(typeof activeChain, 'activeChain');
            switch (activeChain) {
                case '97':
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x61",
                                chainName: "Binance Smart Chain Testnet",
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                            },
                        ]
                    })
                    await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x61" }]
                    });
                    break;
                case '56':
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x38",
                                chainName: "Binance Smart Chain",
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                rpcUrls: ["https://bsc-dataseed.binance.org	"],
                            },
                        ]
                    })
                    await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x38" }]
                    });
                    break;

                default:
                    break;
            }
        } catch (e) {
            console.error(e);
        }

        provider.on("chainChanged", () => {
            window.location.reload()
        })
    } else {
        console.error("Please install MetaMask");
    }
}

export const renderer = ({ years, days, hours, minutes, seconds, completed }: any) => {
    return <span>{years}y {days}d {hours}h {minutes}m {seconds}s</span>;
};

export const REACT_APP_DURATION = process.env.REACT_APP_DURATION as string; //150 days
export const SUPPLY_PRIVATE = process.env.REACT_APP_SUPPLY_PRIVATE as string;
export const SUPPLY_STRATEGIC = process.env.REACT_APP_SUPPLY_STRATEGIC as string;

export const BONUS_PRIVATE = 1500000;
export const BONUS_STRATEGIC = 2000000;

export const TOTAL_VESTING = process.env.REACT_APP_TOTAL_VESTING as string;
export const TOTAL_DAILY = process.env.REACT_APP_TOTAL_DAILY as string;
export const TOTAL_BANTER = process.env.REACT_APP_TOTAL_BANTER as string;
