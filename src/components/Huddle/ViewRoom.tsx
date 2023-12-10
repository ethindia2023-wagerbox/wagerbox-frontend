import {
    useLocalVideo,
    useLocalAudio,
    usePeerIds,
    useRemoteVideo,
    useRemoteAudio,
    useDataMessage
} from '@huddle01/react/hooks';
import { useEffect, useState } from 'react';

// import { transcribeAudio } from '../../services/assemblyai';

import { askAI } from '../../services';

import VideoPlayer from '../VideoPlayer';

const RemotePeer = ({ peerId }: any) => {
    const { stream: videoStream } = useRemoteVideo({ peerId });
    const { stream: audioStream } = useRemoteAudio({ peerId });

    return (
        <div>
            <VideoPlayer videoStream={videoStream} audioStream={audioStream} />
        </div>
    )
};

const HuddleViewRoom = ({ roomId }: any) => {
    const { stream: videoStream, enableVideo, disableVideo } = useLocalVideo();
    const { stream: audioStream, enableAudio, disableAudio } = useLocalAudio();

    const { peerIds } = usePeerIds({ roles: ["guest", "co-host"] }); // Get Hosts And Cohost's peerIds
    const { peerIds: botIds } = usePeerIds({ roles: ["bot"] }); // Get Hosts And Cohost's peerIds

    const [dataToSend, setDataToSend] = useState<string>("");
    const [aiAnswer, setAIAnswer] = useState<string>("");

    const { sendData } = useDataMessage({
        onMessage: async (payload, from, label) => {
            console.log("Received a message!");
            console.log("Message: ", payload);
            console.log("Sender: ", from);
            if (label) console.log("Label: ", label);
            // your code here

            const answer = await askAI(payload);
            setAIAnswer(answer);
        }
    });

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

    useEffect(() => {
        if (audioStream) {

        }
    }, [audioStream])

    const sendDataToBot = async () => {
        sendData({
            to: botIds,
            payload: dataToSend,
            label: roomId
        })
    };

    return (
        <div className='flex flex-col gap-4'>

            <div className='flex flex-row justify-between gap-4'>
                <div className="flex flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Enter data to send"
                        value={dataToSend}
                        onChange={(e) => setDataToSend(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <button className="btn btn-primary" onClick={sendDataToBot}>Ask Question</button>
                </div>
                <p>{aiAnswer}</p>
            </div>

            <div className='grid grid-cols-3'>
                <VideoPlayer videoStream={videoStream} audioStream={audioStream} />
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