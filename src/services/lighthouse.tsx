import lighthouse from '@lighthouse-web3/sdk'
import { DealParameters } from '@lighthouse-web3/sdk/dist/types';

const API_KEY = import.meta.env.VITE_LIGHTHOUSE_KEY
// const PUB_KEY = import.meta.env.VITE_LIGHTHOUSE_PKEY

export const uploadFile = async (files: any, progressCallback: any) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const deal: DealParameters = {
        miner: [],
        num_copies: 1,
        repair_threshold: 1,
        renew_threshold: 1,
        deal_duration: 1,
        network: ""
    }
    const output = await lighthouse.upload(
        files,
        API_KEY,
        false,
        deal,
        progressCallback
    )
    console.log('File Status:', output)
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    return `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
};

export const uploadJson = async (obj: any) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const text = JSON.stringify(obj);

    const output = await lighthouse.uploadText(
        text,
        API_KEY,
    )
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    return `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
};