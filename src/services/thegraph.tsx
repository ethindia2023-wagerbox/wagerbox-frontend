import axios from "axios";

const API_URL = "https://api.thegraph.com/subgraphs/name/sushmitsarmah/wagerbox";

export const getMatches = async () => {
    const query = `
    {
        matchCreateds(first: 5) {
            id
            matchId
            owner
        }
    }
    `
    const resp = await axios({
        method: "POST",
        url: API_URL,
        data: { query },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return resp.data.data;
};