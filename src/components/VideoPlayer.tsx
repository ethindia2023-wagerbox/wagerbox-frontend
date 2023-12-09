import { useEffect, useRef } from 'react';
import { VideoPlayerParams } from '../interfaces';

const VideoPlayer = ({ videoStream, audioStream }: VideoPlayerParams) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const audioRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        const videoObj = videoRef.current;
        if (videoObj && videoStream) {
            videoObj.srcObject = videoStream;
        }
    }, [videoStream])

    useEffect(() => {
        const audioObj = audioRef.current;
        if (audioObj && audioStream) {
            audioObj.srcObject = audioStream;
        }
    }, [audioStream])

    if (videoStream || audioStream) {
        return <>
            { videoStream && <video ref={videoRef} autoPlay />}
            { audioStream && <audio ref={audioRef} autoPlay />}
        </>;
    } else {
        return "";
    }
};

export default VideoPlayer;