import axios from 'axios';

const API_KEY = import.meta.env.VITE_OKTO_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const PIN = "121212";

export async function authenticate() {
    let { data } = await axios.post(
        `/api/v1/authenticate`,
        {
            id_token: CLIENT_ID,
        },
        {
            headers: {
                "x-api-key": API_KEY,
            },
        }
    );

    const token = data.token;
    // user signup flow
    if (token) {
        const { data } = await axios.post(
            `/api/v1/set_pin`,
            {
                id_token: CLIENT_ID,
                token: token,
                relogin_pin: PIN,
                purpose: "set_pin",
            },
            {
                headers: {
                    "x-api-key": API_KEY,
                },
            }
        );
        const { auth_token, refresh_auth_token, device_token } = data;
        return { auth_token, refresh_auth_token, device_token };
    }

    // user login flow
    else {
        const { auth_token, refresh_auth_token, device_token } = data;
        return { auth_token, refresh_auth_token, device_token };
    }
};

export async function refresh_token(
    auth: string,
    refresh: string,
    device: string
) {
    const { data } = await axios.post(
        `/api/v1/refresh_token`,
        {},
        {
            headers: {
                "x-api-key": API_KEY,
                "x-refresh-authorization": `Bearer ${refresh}`,
                "x-device-token": device,
                authorization: `Bearer ${auth}`,
            },
        }
    );
    const { auth_token, refresh_auth_token, device_token } = data;
    return { auth_token, refresh_auth_token, device_token };
};

export async function create_wallet(auth: string) {
    const { data } = await axios.post(
        `/api/v1/wallet`,
        {},
        {
            headers: {
                "x-api-key": API_KEY,
                authorization: `Bearer ${auth}`,
            },
        }
    );
    const { wallets } = data;
    return wallets;
};

export async function logout(auth: string) {
    const { data } = await axios.post(
        `/api/v1/logout`,
        {},
        {
            headers: {
                "x-api-key": API_KEY,
                authorization: `Bearer ${auth}`,
            },
        }
    );
    return data;
};

export async function fetch_network(auth: string) {
    const { data } = await axios.get(`/api/v1/supported/networks`, {
        headers: {
            "x-api-key": API_KEY,
            authorization: `Bearer ${auth}`,
        },
    });
    return data.network;
};