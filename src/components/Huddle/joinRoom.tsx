import { useLocalPeer, usePeerIds, useRoom } from '@huddle01/react/hooks';

import { getJoinRoomToken, getHuddleRoomDetail } from '../../services/huddle';
import { useState } from 'react';

const JoinHuddleRoom = ({ roomId, address }: any) => {
    const [roomJoined, setRoomJoined] = useState<boolean>(false);
    const { peerIds } = usePeerIds({ roles: ["host", "co-host"] }); // Get Hosts And Cohost's peerIds

    const localPeer: any = useLocalPeer({
        onMetadataUpdated(metadata: any) {},
      });

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

    const JoinHuddleRoom = async () => {
        const roomDetail = await getHuddleRoomDetail(roomId);

        const userType = roomDetail.hostWalletAddress.indexOf(address) === -1 ? 'guest' : 'host';

        const obj = await getJoinRoomToken(roomId, userType);
        if (obj?.token) {
            await joinRoom({
                roomId,
                token: obj.token
            });
        }
    };

    const LeaveHuddleRoom = () => {
        if(roomJoined) {
            leaveRoom();
        }
    };

    return (
        <div className='flex flex-row gap-4'>
            <button className='btn btn-success' onClick={JoinHuddleRoom}>
                Join Room
            </button>
            <button className='btn btn-error' onClick={LeaveHuddleRoom}>
                Leave Room
            </button>
        </div>
    );

};

export default JoinHuddleRoom;