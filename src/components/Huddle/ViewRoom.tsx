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

import _ from 'lodash';

import { askAI } from '../../services';

import VideoPlayer from '../VideoPlayer';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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

    const selectUser = async (user: string) => {
        navigate(`/explore/${user}`);
    };

    return (
        <div className='flex flex-col gap-4'>

            <div className='flex flex-row justify-between gap-4 w-full'>
                <div className="flex flex-row gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Enter data to send"
                        value={dataToSend}
                        onChange={(e) => setDataToSend(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <button className="btn btn-primary" onClick={sendDataToBot}>Ask Bot</button>
                </div>
                <p>{aiAnswer}</p>
            </div>

            <div className='flex flex-row gap-4 justify-between'>
                {/* Webcam */}
                <div className='flex flex-row gap-4 justify-between'>
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

                <div className='flex flex-row gap-4 w-1/2'>
                    <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full min-w-md" />
                    <button className='btn btn-primary'>Post Question</button>
                </div>
            </div>

            <div className='flex flex-row gap-4'>
                <div className='grid grid-cols-2 w-1/2'>
                    <VideoPlayer videoStream={videoStream} audioStream={audioStream} />
                    {peerIds.map(peerId =>
                        <RemotePeer key={peerId} peerId={peerId} />
                    )}
                </div>
                <div className='questions flex flex-col gap-4 max-h-screen overflow-scroll w-1/4'>
                    {_.range(0, 5).map((k: any) =>
                        <div key={k} className="card w-full bg-base-100 shadow-xl rounded">
                            <div className="card-body">
                                <h2 className="card-title">Question 1</h2>
                                <p>Will Team 1 win ?</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary">Yes</button>
                                    <button className="btn btn-error">No</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-4 p-3 bg-slate-500 rounded h-screen w-1/4 overflow-scroll'>
                    {_.range(0, 100).map((k: any) =>
                        <div key={k} className='flex flex-row gap-3'>
                            <button className='btn btn-xs btn-success' onClick={() => selectUser('0x3e316f6abe52fC5Cf70A6c9C0932dcB1FCbF3D62')}>vitalik.eth</button>
                            <p>Lorem Ipsum</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
};

export default HuddleViewRoom;