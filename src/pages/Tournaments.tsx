import { useState } from "react";

import TournamentThumb from "../components/TournamentThumb";
import CreateTourModal from "../components/CreateTourModal";

const TOUR = [
    {
        title: "DOTA2 ETH Championships",
        startDate: "2023/12/28",
        startTime: "09:00",
        numPlayers: 2,
        players: [
            {
                name: "Team Madrid",
                address: ""
            },
            {
                name: "Team Berlin",
                address: ""
            },
        ],
        img: "",
        status: "Upcoming"
    },
    {
        title: "DOTA2 ETH Championships",
        startDate: "2023/12/28",
        startTime: "09:00",
        numPlayers: 2,
        players: [
            {
                name: "Team Madrid",
                address: "",
                img: ""
            },
            {
                name: "Team Berlin",
                address: "",
                img: ""
            },
        ],
        img: "",
        status: "Upcoming"
    },
];

const Tournaments = () => {
    const [inputTxt, setInputTxt] = useState<string>("");

    return (
        <div className="bg-black p-5 min-h-screen flex flex-col gap-4">
            <p className="font-bold text-3xl text-white">Search for a Tournament</p>
            <input
                className="input input-bordered w-full"
                type="text"
                value={inputTxt}
                placeholder="Enter address"
                onChange={(e: any) => setInputTxt(e.target.value)} />

            {/* <button
                className="btn btn-secondary text-black w-80 font-bold text-xl">
                    Create a Tournament
            </button> */}
            <CreateTourModal />

            <div className="grid grid-cols-3 gap-4">
                {TOUR.map((obj: any, i: number) =>
                    <TournamentThumb key={i} obj={obj}/>
                )}
            </div>
        </div>
    );
};

export default Tournaments;