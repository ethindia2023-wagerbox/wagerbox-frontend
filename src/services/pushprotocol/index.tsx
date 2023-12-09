import { INotification, PushAPI, CONSTANTS, CreateChannelOptions } from '@pushprotocol/restapi';

export const initUser = async (account: any, env = CONSTANTS.ENV.STAGING) => {
    const user = await PushAPI.initialize(
        account,
        { env }
    );
    return user;
};

export const createChannel = async (
    user: PushAPI,
    options: CreateChannelOptions
) => {
    const resp = await user.channel.create(options);
    return resp;
};

export const sendNotification = async (
    user: PushAPI,
    notification: INotification,
    recipients = ["*"]
) => {
    const resp = await user.channel.send(
        recipients,
        { notification }
    );
    return resp;
};

export const subscribeToChannel = async (
    user: PushAPI,
    channelAddress: string
) => {
    const chainId = '11155111';
    const resp = await user.notification.subscribe(
        `eip155:${chainId}:${channelAddress}`
    );
    return resp;
};

export const unSubscribeToChannel = async (
    user: PushAPI,
    channelAddress: string
) => {
    const chainId = '11155111';
    const resp = await user.notification.unsubscribe(
        `eip155:${chainId}:${channelAddress}`
    );
    return resp;
};

export const fetchUserNotifications = async (
    user: PushAPI,
) => {
    const resp = await user.notification.list("INBOX");
    return resp;
};