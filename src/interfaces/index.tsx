export interface HuddleCreateRoomParams {
    title: string;
    hostWallets: string[];
};

export interface HuddleCreateRoomResp {
    message: string;
    data: {
        roomId: string;
        meetingLink: string;
    };
};

export interface HuddleRoomObj {
    roomId: string;
    meetingUrl: string;
    startTime: any;
    expiryTime: any;
    roomType: string;
};

export interface HuddleRoomsResp {
    nextCursor: number;
    prevCursor: number;
    count: number;
    rooms: HuddleRoomObj[];
};

export interface HuddleJoinRoomResp {
    token: string;
    hostUrl: string;
    redirectUrl: string;
};

export interface VideoPlayerParams {
    videoStream: MediaStream | null;
    audioStream: MediaStream | null;
}

export interface RoomDetailResp {
    roomId: string;
    title: string;
    description: string | null;
    meetingLink: string;
    startTime: string | null;
    expiryTime: string | null;
    videoOnEntry: boolean;
    muteOnEntry: boolean;
    roomLocked: boolean;
    hostWalletAddress: string[];
}