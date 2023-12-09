import { useState } from 'react';

import { uploadJson, uploadFile } from '../services/lighthouse';

const LightHouse = () => {
    const [files, setFiles] = useState<any>();

    const progressCallback = (progressData: any) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded as any)?.toFixed(2)
        console.log(percentageDone)
    };

    const uploadFileToLighthouse = async () => {
        const ipfsUrl = await uploadFile(
            files,
            progressCallback
        )
        console.log(ipfsUrl)
    };

    const uploadJsonToLighthouse = async () => {
        const ipfsUrl = await uploadJson(
            { title: "Hello World" }
        )
        console.log(ipfsUrl)
    };

    return (
        <div className='flex flex-row gap-10 p-5'>
            LightHouse
            <div className='flex flex-col gap-4'>
                <input
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    onChange={e => setFiles(e.target.files)} type="file" />
                <button className='btn btn-primary w-40' onClick={uploadFileToLighthouse}>Upload to Lighthouse</button>
            </div>
            <button className='btn btn-secondary w-40' onClick={uploadJsonToLighthouse}>Upload Json to Lighthouse</button>
        </div>
    )
};

export default LightHouse;