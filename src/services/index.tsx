import axios from "axios";

export const askAI = async (msg: string) => {
    const url = "http://0.0.0.0:8080/ask-ai";
    const resp = await axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ msg })
    });
    return resp.data?.msg;
};