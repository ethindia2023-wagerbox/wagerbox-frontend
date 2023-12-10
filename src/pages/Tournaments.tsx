import { useState } from "react";

import TournamentThumb from "../components/TournamentThumb";
import CreateTourModal from "../components/CreateTourModal";
import { Link } from "react-router-dom";

import { getMatches } from "../services/thegraph";

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
    const [matches, setMatches] = useState<any[]>([]);

    const onClick = async () => {
        const data = await getMatches();
        setMatches(data);
        console.log(data)
    };

    return (
        <div className="bg-black p-5 min-h-screen flex flex-col gap-4">
            <p className="font-bold text-3xl text-white">Search for a Tournament</p>
            <input
                className="input input-bordered w-full"
                type="text"
                value={inputTxt}
                placeholder="Enter address"
                onChange={(e: any) => setInputTxt(e.target.value)} />

            <div className="flex flex-row gap-4">
                <CreateTourModal />
                <button className="btn btn-warning" onClick={onClick}>
                    Fetch Matches from Chain
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {matches.map((obj: any, i: number) =>
                    <Link to={`/games/${i}`} key={i}>
                        <div className="bg-slate-400 rounded p-5 line-clamp-1">
                            {obj.id}
                        </div>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4">
                {TOUR.map((obj: any, i: number) =>
                    <Link to={`/games/${i}`} key={i}>
                        <TournamentThumb obj={obj} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Tournaments;