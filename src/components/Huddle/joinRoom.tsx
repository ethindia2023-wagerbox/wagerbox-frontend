import { useRoom } from '@huddle01/react/hooks';

import { getJoinRoomToken } from '../../services/huddle';
import { useState } from 'react';

const JoinHuddleRoom = ({ roomId }: any) => {
    const [roomJoined, setRoomJoined] = useState<boolean>(false);

    const { joinRoom, leaveRoom } = useRoom({
        onJoin: () => {
            console.log('Joined the room');
            setRoomJoined(true);
        },
        onLeave: () => {
            console.log('Left the room');
            setRoomJoined(false);
        },
    });

    const JoinHuddleRoom = async () => {
        const obj = await getJoinRoomToken(roomId, 'host');
        if (obj?.token) {
            joinRoom({
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