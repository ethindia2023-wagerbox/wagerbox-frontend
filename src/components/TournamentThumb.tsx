import { useEffect } from "react";

const TournamentThumb = ({ obj }: any) => {

    useEffect(() => {
        console.log(obj)
    }, [obj])

    return (
        <div className="p-5 bg-slate-800">
            <div className="relative min-h-[300px]">
                <img src={obj.img} />
                <div className="status absolute top-5 right-5 bg-[#ff0000] text-black rounded p-2">
                    {obj.status}
                </div>
                <div className="absolute top-1/2 left-1/2 font-bold">Vs</div>
                <div className="absolute players grid grid-cols-2 gap-10 top-1/2">
                    {obj?.players.map((k: any, idx: number) =>
                        <div className="min-h-[100px] bg-white" key={idx}>
                            <img src={k.img}/>
                            <p>{k.name}</p>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-3xl font-bold text-white">{obj.title}</p>
            <p className="font-bold flex flex-row gap-4 text-white">
                <span>{obj.startDate}</span>
                <span>{obj.startTime}</span>
            </p>
        </div>
    )
};

export default TournamentThumb