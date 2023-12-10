import { ethers, providers } from 'ethers';

import WagerBoxContractABI from './contracts/WagerBoxABI.json';
import WagerBoxTokenABI from './contracts/WagerBoxToken.json';
import { WalletClient } from 'wagmi';

const WagerBoxToken: any = {
    sepolia: "0xde15Ea1d35447b1422af66141C0D5DbD758a5C5a",
    mumbai: "0x85C4636D3Ad5176BF836f7068169D902a2103887"
};

const WagerBoxContract: any = {
    sepolia: "0xaB5AE0e7E51e40C1935CaAF3B2cC7692BD243F10",
    mumbai: "0x54A081EFEc140Eab59f49FC110D842d54f1de993",
    scrollSepolia: "0xD64e0acF9F20da407df2dA759F43DF7e7C0D6BDb",
    alfajores: "0xD64e0acF9F20da407df2dA759F43DF7e7C0D6BDb",
    x1: "0xD64e0acF9F20da407df2dA759F43DF7e7C0D6BDb",
    zkEVM: "0xD64e0acF9F20da407df2dA759F43DF7e7C0D6BDb"
};

// const CCIP: any = {
//     sepolia: {
//         router: "0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59",
//         link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
//     },
//     mumbai: {
//         router: "0x1035cabc275068e0f4b745a29cedf38e13af41b1",
//         link: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
//     },
// };

export function walletClientToProvider(walletClient: WalletClient) {
    const { chain, transport } = walletClient
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new providers.Web3Provider(transport as any, network)
    return provider
};

// This function will set up a contract instance and allow you to call its functions
export const getWagerBoxContract = async ({
    chain,
    connector
}: any) => {
    const provider = await connector.getProvider();
    const signer = new ethers.providers.Web3Provider(provider).getSigner()
    const contract = new ethers.Contract(
        WagerBoxContract[chain],
        WagerBoxContractABI.abi,
        signer
    );
    return contract;
};

export const getWagerBoxTokenContract = ({
    chain,
    signer
}: any) => {
    const contract = new ethers.Contract(
        WagerBoxToken[chain],
        WagerBoxTokenABI.abi as any,
        signer
    );
    return contract;
};

export const createMatch = async (
    contract: ethers.Contract,
    ipfsURL: string,
    playerStake: number
) => {
    try {
        const playerStakeBigNumber = ethers.utils.parseUnits(playerStake.toString(), 'wei');

        const tx = await contract.createMatch(ipfsURL, playerStakeBigNumber);
        const resp = await tx.wait();  // Wait for the transaction to be mined
        return resp;
    } catch (error) {
        console.error('Error creating Match: ', error);
    }
};