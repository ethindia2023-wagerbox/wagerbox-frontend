import { Link } from "react-router-dom";

const Landing = () => {

    const addButtons = () => {
        return <div className="flex flex-row gap-4 ">
            <Link to="/tournaments">
                <button className="btn bg-[#4E36C3] border-none text-white">Play Now</button>
            </Link>
            <Link to="/tournaments">
                <button className="btn bg-[#8D0076] border-none text-white">Learn Now</button>
            </Link>
        </div>
    };

    return (
        <>
            {/* header */}
            <div className="Header bg-[#000000]">
                <img src="/img/header.png" />
                <div className="absolute left-10 top-1/4 text-white flex flex-col gap-4">
                    <div className="flex flex-col gap-4 text-5xl font-bold">
                        <img className="w-1/2" src="/img/logo.png" />
                        <p className="flex flex-row gap-4">
                            <span>Beyond The</span>
                            <span className="text-yellow">Past,</span>
                        </p>
                        <p className="flex flex-row gap-4">
                            <span>Before The Future</span>
                        </p>
                    </div>
                    <p className="flex flex-col font-bold text-xl">
                        <span>Unlock Your Sports Predictions Power with Wagerbox</span>
                        <span>Where Web3 and Winning Collide</span>
                    </p>
                    {addButtons()}
                </div>

            </div>

            {/* banner */}
            <div className="Banner flex flex-row bg-yellow justify-between text-black font-bold p-2">
                <p>Best Games</p>
                <div>
                    <img className="icon" />
                    <p>Packaged Quizzes Recommendation</p>
                </div>
                <div>
                    <img className="icon" />
                    <p>Sports Betting</p>
                </div>
                <div>
                    <img className="icon" />
                    <p>Bet on Favourite Esports</p>
                </div>
            </div>

            <div className="bg-[#211551] flex flex-col gap-4 p-5 items-center">
                <div className="font-bold text-white text-3xl items-center flex flex-col">
                    <p>Choose your</p>
                    <p className="flex flex-row gap-4">
                        <span className="text-yellow">Favourite</span>
                        <span>Game Streams To</span>
                    </p>
                    <p>Bet on</p>
                </div>

                <div className="flex flex-row gap-4">
                    <img src="/img/img1.jpg" className="rounded-3xl" />
                    <img src="/img/img2.jpg" className="rounded-3xl" />
                    <img src="/img/img3.jpg" className="rounded-3xl" />
                    <img src="/img/img4.jpg" className="rounded-3xl" />
                    <img src="/img/img5.jpg" className="rounded-3xl" />
                    <img src="/img/img6.jpg" className="rounded-3xl" />
                </div>
                {addButtons()}
            </div>

            <div className="bg-[#000000] flex flex-col items-center p-5 text-3xl">
                {/* <p className="text-white font-bold">How it works</p> */}
                {/* <img src="/img/howitworks.png"/> */}
            </div>
        </>
    )
};

export default Landing;