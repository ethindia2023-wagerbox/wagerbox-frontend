import axios from 'axios';

const API_KEY = import.meta.env.VITE_OKTO_KEY;

export async function authenticate(idToken: string, pin: string) {
    let { data } = await axios.post(
        `/api/v1/authenticate`,
        {
            id_token: idToken,
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
                id_token: idToken,
                token: token,
                relogin_pin: pin,
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
}