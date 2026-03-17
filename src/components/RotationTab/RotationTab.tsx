import { Assets } from "../../lib/assets";
import { TerminalLabel } from "./TerminalComponent/InputTextTerminal";
import { useCalcTabStore } from "./UseCalcStore";


const MainDPSPfp = () => {
    const { mainDPSId } = useCalcTabStore();
    if (!mainDPSId)
        return (<></>);

    return (
        <img src={Assets.getRole(mainDPSId)} className="w-auto size-32 max-w-none" />
    )
}

const TeammatePfp = () => {
    const { teammatesId } = useCalcTabStore();
    if (teammatesId.length === 0)
        return (<></>);

    return (
        <>
            {teammatesId.map((id, index) => (
                <img key={index} src={Assets.getRole(id)} className="w-auto h-24 max-w-none" />
            ))}
        </>

    )
}

const RotationTab = () => {
    const { logHistory } = useCalcTabStore();
    return (
        <div className="w-full flex-col h-max p-2">
            <div className="flex m-auto w-fit gap-2 bg-stone-900 rounded-2xl">
                <div className="flex relative gap-2 mx-10 my-2 bg-stone-900 rounded-2xl">
                    <div className="relative grid grid-rows-3 gap-2 h-[840px] my-2 ">
                        <div className="relative bg-stone-950 shadow-inner border-2 border-stone-800 border-opacity-75 rounded-xl ">
                            <TerminalLabel />
                            <div className="flex flex-col mx-7 pb-1 h-[60%] overflow-hidden">
                                {logHistory.map((logRow, index) => (
                                    <div className={logRow["code"] ? `text-lime-500` : `text-red-500`} key={index}>{logRow["msg"]}</div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <span className="card-primary"></span>
                            <span className="card-primary"></span>
                            <span className="card-primary"></span>
                        </div>
                        <div className="flex flex-row items-end">
                            <MainDPSPfp />
                            <TeammatePfp />

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}


export default RotationTab