import axios from 'axios'
import {
    HuddleCreateRoomParams,
    HuddleCreateRoomResp,
    HuddleRoomsResp,
    HuddleJoinRoomResp
} from '../../interfaces';

const HUDDLE_API_KEY = import.meta.env.VITE_HUDDLE_API_KEY;
const API_URL = import.meta.env.VITE_HUDDLE_API_URL;

export const createHuddleRoom = async (
    obj: HuddleCreateRoomParams
): Promise<HuddleCreateRoomResp | null> => {
    const url = `${API_URL}/create-room`;

    try {
        const resp = await axios.post(
            url,
            {
                title: obj.title,
                hostWallets: obj.hostWallets,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': HUDDLE_API_KEY,
                },
            }
        );
        return resp.data as HuddleCreateRoomResp;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getHuddleRooms = async (): Promise<HuddleRoomsResp | null> => {
    const url = `${API_URL}/get-rooms`;
    try {
        const resp = await axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': HUDDLE_API_KEY,
                },
            }
        );
        return resp.data as HuddleRoomsResp;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const getJoinRoomToken = async (
    roomId: string,
    userType: string
): Promise<HuddleJoinRoomResp | null> => {
    const url = `${API_URL}/join-room-token`;
    try {

        const resp = await axios.post(
            url,
            {
                roomId: roomId,
                userType: userType
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': HUDDLE_API_KEY,
                },
            }
        );
        return resp.data as HuddleJoinRoomResp;
    } catch (error) {
        console.log(error);
        return null;
    }
};