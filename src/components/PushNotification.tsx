import { PushAPI } from '@pushprotocol/restapi';
import { useEffect, useState } from 'react';
import { useWalletClient } from 'wagmi'

import {
    fetchUserNotifications,
    sendNotification,
    initUser
} from '../services/pushprotocol'


const PushNotification = () => {
    const { data: walletClient } = useWalletClient();
    const [pushUser, setPushUser] = useState<PushAPI>();

    const pushNot = async () => {
        if (pushUser) {
            await sendNotification(pushUser, {
                title: 'Hello World Notification',
                body: 'Web3 native notifications are here!',
            });

            const notifications = await fetchUserNotifications(pushUser);
            console.log(notifications);
        }
    };

    const initPush = async () => {
        const account = walletClient as any;
        if (account) {
            initUser(account).then((user: PushAPI) => {
                setPushUser(user);
            });
        }
    };

    useEffect(() => {

    }, [walletClient]);

    return (
        <div className='flex flex-col gap-4 p-10'>
            Push Protocol Notification
            <button className="btn btn-warning" onClick={initPush}>Init Push</button>
            <button className='btn btn-success w-40' onClick={pushNot}>Send Notification</button>
        </div>
    )
};

export default PushNotification;