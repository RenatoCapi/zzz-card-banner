import { Assets } from "../../lib/assets";
import { TerminalInputText } from "./TerminalInput";
import { useCalcTabStore } from "./UseCalcStore";


const RotationTab = () => {
    const { dps } = useCalcTabStore();
    console.log(dps);

    return (
        <div className="w-full flex-col p-2">
            <div className="flex m-auto w-fit gap-2 bg-stone-900 rounded-2xl">
                <div className="flex relative gap-2 m-2 bg-stone-900 rounded-2xl">
                    <div className="relative grid grid-rows-4 gap-2 h-[840px] my-2 ">
                        <div className="relative row-span-2 mx-8 bg-stone-950 shadow-inner border-2 border-stone-800/75 rounded-xl ">
                            <TerminalInputText />
                            <LogHistoryLabel />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <span className="card-primary">
                                {dps ? "DPS: " + dps : ""}
                            </span>
                            <span className="card-primary"></span>
                            <span className="card-primary"></span>
                        </div>
                        <div className="flex flex-row items-end m-2">
                            <MainDPSPfp />
                            <TeammatePfp />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


const LogHistoryLabel = () => {
    const { logHistory } = useCalcTabStore();
    const style = ` text-[14px] tracking-[0.5px] leading-normal`;
    const isError = (code: number) => ((code ? `text-lime-500` : `text-red-500`) + style);

    return (
        <div className="flex flex-col mx-8 pb-1 h-[79%] overflow-hidden ">
            {logHistory.map((logRow, index) => (
                <div key={index} className="p-1">
                    <div className="text-stone-200/50 text-[11px] ">&#35; {logRow["cmd"]}</div>
                    <div className={isError(logRow["code"])}>{logRow["msg"]}</div>
                </div>
            ))}
        </div>
    );
}

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

export default RotationTab

