import lighthouse from '@lighthouse-web3/sdk'
import { DealParameters } from '@lighthouse-web3/sdk/dist/types';
import { useState } from 'react';

const API_KEY = import.meta.env.VITE_LIGHTHOUSE_KEY

const LightHouse = () => {
    const [files, setFiles] = useState<any>();

    const progressCallback = (progressData: any) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded as any)?.toFixed(2)
        console.log(percentageDone)
    };

    const uploadFile = async () => {
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

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
    }

    return (
        <div>
            LightHouse
            <input onChange={e=>setFiles(e.target.files)} type="file" />
            <button onClick={uploadFile}>Upload to Lighthouse</button>
        </div>
    )
};

export default LightHouse;