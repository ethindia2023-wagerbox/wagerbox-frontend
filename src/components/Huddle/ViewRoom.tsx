import {
    useLocalVideo,
    useLocalAudio,
    usePeerIds,
    useRemoteVideo
} from '@huddle01/react/hooks';
import { useEffect } from 'react';

import ReactPlayer from 'react-player';

const RemotePeer = ({ peerId }: any) => {
    const { stream } = useRemoteVideo({ peerId });

    return (
        <div>
            <ReactPlayer url={stream as MediaStream} />
        </div>
    )
};

const HuddleViewRoom = () => {
    const { enableVideo, disableVideo } = useLocalVideo();
    const { enableAudio, disableAudio } = useLocalAudio();

    const { peerIds } = usePeerIds({ roles: ["host", "co-host"] }); // Get Hosts And Cohost's peerIds

    const startVideo = async () => {
        await enableVideo();
    };

    const stopVideo = async () => {
        await disableVideo();
    };

    const startAudio = async () => {
        await enableAudio();
    };

    const stopAudio = async () => {
        await disableAudio();
    };

    useEffect(() => {
        console.log(peerIds)
    }, [peerIds])

    return (
        <div className='flex flex-col gap-4'>

            <div className='grid grid-cols-2'>
                {peerIds.map(peerId =>
                    <RemotePeer key={peerId} peerId={peerId} />
                )}
            </div>


            <div className='flex flex-row gap-4'>
                {/* Webcam */}
                <button
                    className='btn btn-success'
                    onClick={startVideo} >
                    Start Video
                </button>

                <button
                    className='btn btn-error'
                    onClick={stopVideo} >
                    Stop Video
                </button>

                {/* Mic */}
                <button
                    className='btn btn-success'
                    onClick={startAudio} >
                    Start Audio
                </button>

                <button
                    className='btn btn-error'
                    onClick={stopAudio} >
                    Stop Audio
                </button>
            </div>

        </div>
    )
};

export default HuddleViewRoom;