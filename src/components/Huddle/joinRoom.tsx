import { useRoom } from '@huddle01/react/hooks';

import { getJoinRoomToken, getHuddleRoomDetail } from '../../services/huddle';
import { useState } from 'react';

const JoinHuddleRoom = ({ roomId, address }: any) => {
    const [roomJoined, setRoomJoined] = useState<boolean>(false);
    // const { peerIds } = usePeerIds({ roles: ["host", "co-host"] }); // Get Hosts And Cohost's peerIds

    // const localPeer: any = useLocalPeer({
    //     onMetadataUpdated(metadata: any) {
    //         console.log(metadata);
    //     },
    // });

    const { joinRoom, leaveRoom } = useRoom({
        onJoin: () => {
            console.log('Joined the room');
            setRoomJoined(true);
        },
        onLeave: () => {
            console.log('Left the room');
            setRoomJoined(false);
        },
        onWaiting: (data: any) => {
            console.log(data)
        },
        onFailed: (data: any) => {
            console.log(data)
        }
    });

    const joinHuddleRoom = async (userType?: string) => {
        const roomDetail = await getHuddleRoomDetail(roomId);

        if (!userType) {
            if (
                roomDetail.hostWalletAddress.indexOf(address) !== -1
            ) {
                userType = 'host';
            } else {
                userType = 'guest'
            }
        }
        const obj = await getJoinRoomToken(roomId, userType);
        if (obj?.token) {
            const k = await joinRoom({
                roomId,
                token: obj.token
            });
            console.log(k)
        }
    };

    const leaveHuddleRoom = () => {
        if (roomJoined) {
            leaveRoom();
        }
    };

    const addBot = async () => {
        await joinHuddleRoom("bot");
    };

    return (
        <div className='flex flex-row gap-4'>
            <button className='btn btn-success' onClick={() => joinHuddleRoom()}>
                Join Room
            </button>
            <button className='btn btn-error' onClick={leaveHuddleRoom}>
                Leave Room
            </button>
            <button className="btn btn-primary" onClick={addBot}>
                Add a Bot
            </button>
        </div>
    );

};

export default JoinHuddleRoom;