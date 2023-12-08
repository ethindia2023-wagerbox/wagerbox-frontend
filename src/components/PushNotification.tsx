import { PushAPI } from '@pushprotocol/restapi';
import { useEffect } from 'react';
import { useWalletClient } from 'wagmi'


const PushNotification = () => {
    const { data: walletClient } = useWalletClient()

    const pushNot = async () => {
        const account = walletClient as any;
        if (account) {
            const userAlice = await PushAPI.initialize(
                account,
                { 
                    env: 'staging' as any 
                }
            );

            // Send a notification to users of your protocol
            const apiResponse = await userAlice.channel.send(['*'], {
                notification: {
                    title: 'Hello World Notification',
                    body: 'Web3 native notifications are here!',
                }
            });

            console.log(apiResponse);
        }
    };

    useEffect(() => {
        // pushNot();
    }, [walletClient])

    return (
        <div className='flex flex-col gap-4 p-10'>
            Push Protocol Notification
            <button className='btn btn-success w-40' onClick={pushNot}>Send Notification</button>
        </div>
    )
};

export default PushNotification;