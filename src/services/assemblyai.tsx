// npm install assemblyai

import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
    apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
});

export const transcribeAudio = async (audioStream: MediaStream) => {
    // const audioUrl =
    //     'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

    const config: any = {
        audio: audioStream
    }

    const transcript = await client.transcripts.transcribe(config)
    console.log(transcript.text)
};

// export const sendAudioToSpeechToTextAPI = async ()
