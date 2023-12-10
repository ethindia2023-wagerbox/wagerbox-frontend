import Airstack from "../components/Airstack";
// import PushNotification from "../components/PushNotification";
// import LightHouse from "../components/LightHouse";

import { useParams } from "react-router-dom";

// import {getMatches} from "../services/thegraph";

const Explore = () => {
    const { user } = useParams();

    // const onClick = async () => {
    //     const data = await getMatches();
    //     console.log(data)
    // };

    return (
        <div>
            <Airstack user={user} />
            {/* <PushNotification /> */}
            {/* <LightHouse /> */}

            {/* <button className="btn btn-warning" onClick={onClick}>
                fetch matches
            </button> */}
        </div>
    )
};

export default Explore;