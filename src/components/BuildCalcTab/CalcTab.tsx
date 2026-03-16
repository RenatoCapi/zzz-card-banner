import { Assets } from "../../lib/assets";
import { TerminalLabel } from "./TerminalComponent/InputTextTerminal";
import { useCalcTabStore } from "./UseCalcStore";


const MainDPSpfp = () => {
    const { mainDPSId } = useCalcTabStore();
    if (!mainDPSId)
        return (<></>);

    return (
        <img src={Assets.getRole(mainDPSId)} className="w-auto size-32 max-w-none" />
    )
}

const TeammatePFP = () => {
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

const CalcTab = () => {
    const { logHistory } = useCalcTabStore();
    return (
        <div className="w-full flex-col h-[890px] p-2">
            <div className="flex m-auto w-fit gap-2 bg-stone-900 rounded-2xl">
                <div className="flex relative gap-2 mx-10 my-2 bg-stone-900 rounded-2xl">
                    <div className="relative grid grid-rows-2 h-[840px] my-2">
                        <div className="flex flex-col bg-stone-950 shadow-inner border-2 border-stone-800 border-opacity-75 rounded-xl">
                            <TerminalLabel />
                            <div className="flex flex-col h-[280px] mx-7">
                                {logHistory.map((logRow, index) => (
                                    <div key={index}>{logRow}</div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div>

                            </div>

                            <div className="flex flex-row items-end">
                                <MainDPSpfp />
                                <TeammatePFP />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}


export default CalcTab