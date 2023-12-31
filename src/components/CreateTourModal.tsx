import { useEffect, useRef, useState } from "react";
import { useWalletClient, useNetwork, useAccount } from "wagmi";
import { getWagerBoxContract, createMatch } from "../web3";

import {
    uploadJson,
    uploadFile
} from '../services/lighthouse';

const FORM_ELEMENTS = [
    { name: 'title', label: 'Tournament Title', placeholder: 'Enter Tournament Title' },
    { name: 'category', label: 'Category', placeholder: 'Enter Category' },
    { name: 'startDate', label: 'Start Date', placeholder: 'Enter Start Date' },
    { name: 'startTime', label: 'Start Time', placeholder: 'Enter Start Time' },
    { name: 'duration', label: 'Duration in hours', placeholder: 'Enter duration in hours' },
    { name: 'numPlayers', label: 'Number of Players', placeholder: 'Enter Number of Players' },
    { name: 'playerStake', label: 'Player Stake Amount', placeholder: 'Enter Player Stake Amount' },
    { name: 'audienceStake', label: 'Audience Stake Amount', placeholder: 'Enter Audience Stake Amount' },
];

const CreateTourModal = () => {
    const { connector } = useAccount();
    const { data: walletClient } = useWalletClient();
    const { chain } = useNetwork();

    const modalRef = useRef<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [contract, setContract] = useState<any>();
    const [files, setFiles] = useState<any>();

    const toggleModal = () => {
        setShowModal(!showModal)
        console.log(showModal)
    };

    const formSubmit = async (e: any) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements as HTMLFormControlsCollection;
        const formData: { [key: string]: string } = {};

        for (const element of formElements) {
            const input = element as HTMLInputElement;
            // Check if the element is an input and has a name attribute
            if (input.name) {
                formData[input.name] = input.value;
            }
        }

        const ipfsUrl = await uploadFileToLighthouse();
        formData.image_ipfs = ipfsUrl;
        const detailsIPFS = await uploadJson(formData);
        const resp = await createMatch(
            contract,
            detailsIPFS,
            +formData.playerStake
        );
        console.log(resp);
    };

    const progressCallback = (progressData: any) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded as any)?.toFixed(2)
        console.log(percentageDone)
    };

    const uploadFileToLighthouse = async () => {
        const ipfsUrl = await uploadFile(
            files,
            progressCallback
        );
        return ipfsUrl;
    };

    useEffect(() => {
        if (walletClient && chain) {
            const network = chain?.network
            getWagerBoxContract({ chain: network, connector })
                .then((contract: any) => {
                    setContract(contract);
                });
        }
    }, [walletClient, chain]);

    return (
        <>
            <button
                className="btn btn-secondary text-black w-80 font-bold text-xl"
                onClick={() => toggleModal()}
            >
                Create a Tournament
            </button>
            <dialog className={showModal ? "modal modal-open" : "modal"} ref={modalRef} >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create Tournament Form</h3>
                    <form onSubmit={formSubmit}>
                        <div className="modal-body">
                            {FORM_ELEMENTS.map((k: any) =>
                                <label key={k.name} className="form-control w-full">
                                    <div className="label w-full">
                                        <span className="label-text font-bold">{k.label}</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={k.placeholder}
                                        name={k.name}
                                        className="input input-bordered w-full"
                                    />
                                </label>
                            )}

                            <div className='flex flex-col gap-4'>
                                <label>Upload Image</label>
                                <input
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                    onChange={e => setFiles(e.target.files)} type="file" />
                            </div>

                        </div>
                        <div className="modal-action flex flex-row justify-right gap-4">
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                            <button className="btn btn-error" onClick={() => toggleModal()}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default CreateTourModal;