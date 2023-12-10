import { useParams } from "react-router-dom";
import HuddleViewRoom from "../components/Huddle/ViewRoom";

const ViewGame = () => {
    let { id } = useParams();
    return (
        <div className="p-5 bg-black min-h-screen">
            <HuddleViewRoom roomId={id} />
        </div>
    )
};

export default ViewGame;