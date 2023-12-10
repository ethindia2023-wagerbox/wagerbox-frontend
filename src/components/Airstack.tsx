import { CSSProperties, useEffect, useState } from "react";
import { fetchQuery } from "@airstack/airstack-react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

import {
    fetchENS,
    fetchNFTs
} from '../services/airstack'

const Airstack = ({ user }: any) => {
    let [color] = useState("#ffffff");
    let [ensName] = useState<string>("vitalik.eth");
    let [blockchain] = useState<string>("ethereum");
    const [loading, setLoading] = useState<boolean>(false);
    const [inputTxt, setInputTxt] = useState<string>("");
    const [data, setData] = useState<any>([]);

    // const { data, error, loading }: QueryResponse = useQuery(
    //     fetchENS(ensName, blockchain),
    //     {},
    //     { cache: false }
    // );

    const fetchData = async () => {
        const query = fetchENS(ensName, blockchain);
        try {
            setLoading(true);
            const response = await fetchQuery(query);
            console.log(response);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchNfts = async () => {
        const query = fetchNFTs(inputTxt, blockchain);
        try {
            setLoading(true);
            const response = await fetchQuery(query);
            console.log(response);
            setData(response?.data?.TokenBalances?.TokenBalance)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInputTxt(user);
        fetchNfts();
    }, [user]);

    return (
        <>
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className="p-10 flex flex-col gap-4">
                <input className="input input-bordered w-full" type="text" value={inputTxt} placeholder="Enter address" onChange={(e: any) => setInputTxt(e.target.value)} />
                <div className="flex flex-row gap-4">
                    <button className="btn btn-primary" onClick={fetchData}>Fetch ENS Details</button>
                    <button className="btn btn-primary" onClick={fetchNfts}>Fetch NFT Data</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {data.map((k: any) =>
                        <img key={k.tokenId} src={k?.tokenNfts?.contentValue?.image?.small}/>
                    )}
                </div>
            </div>
        </>
    );
};

export default Airstack;