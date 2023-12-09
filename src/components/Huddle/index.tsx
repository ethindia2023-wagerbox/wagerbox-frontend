import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import JoinHuddleRoom from "./joinRoom";
import HuddleViewRoom from "./ViewRoom";

import {
    createHuddleRoom,
    getHuddleRooms
} from "../../services/huddle";
import {
    HuddleRoomObj,
    HuddleCreateRoomParams,
    HuddleCreateRoomResp
} from "../../interfaces";

const HuddleComp = () => {
    const { address, isConnected } = useAccount();
    const [huddleRooms, setHuddleRooms] = useState<HuddleRoomObj[]>([]);
    const [roomTitle, setRoomTitle] = useState<string>("");
    const [newCreatedRoom, setNewCreatedRoom] = useState<HuddleCreateRoomResp>();

    const fetchHuddleRooms = async () => {
        const resp = await getHuddleRooms();
        setHuddleRooms(resp?.rooms || []);
    };

    const huddleRoomCreate = async () => {
        if (isConnected && address) {
            const obj: HuddleCreateRoomParams = {
                title: roomTitle,
                hostWallets: [address]
            }
            const resp: HuddleCreateRoomResp | null = await createHuddleRoom(obj);
            if (resp) {
                setNewCreatedRoom(resp);
            }
        }
    };

    useEffect(() => {
        fetchHuddleRooms();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-5">
            <div className="flex flex-row gap-2">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setRoomTitle(e.target.value)}
                />
                <button className="btn btn-success" onClick={huddleRoomCreate}>Create Room</button>
            </div>

            {newCreatedRoom &&
                <div className="flex flex-col gap-4 p-5 bg-yellow">
                    <p>New Room: {newCreatedRoom?.data.roomId}</p>
                    <JoinHuddleRoom roomId={newCreatedRoom?.data.roomId} />
                </div>
            }

            <div className="grid grid-cols-4 gap-4">
                {huddleRooms.map((obj: HuddleRoomObj) =>
                    <div key={obj.roomId} className="flex flex-col gap-4 p-5 bg-yellow rounded">
                        <p className="font-bold">Room: {obj.roomId}</p>
                        <JoinHuddleRoom roomId={obj.roomId} />
                    </div>
                )}
            </div>

            <div>
                <HuddleViewRoom />
            </div>
        </div>
    )
};

export default HuddleComp;