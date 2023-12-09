import Airstack from "../components/Airstack";
import PushNotification from "../components/PushNotification";
import LightHouse from "../components/LightHouse";

import {getMatches} from "../services/thegraph";

const Explore = () => {

    const onClick = async () => {
        const data = await getMatches();
        console.log(data)
    };

    return (
        <div>
            <Airstack />
            <PushNotification />
            <LightHouse />

            <button className="btn btn-warning" onClick={onClick}>
                fetch matches
            </button>
        </div>
    )
};

export default Explore;