import { Assets } from "../../lib/assets";
import { TerminalLabel } from "./TerminalComponent/InputTextTerminal";
import { useCalcTabStore } from "./UseCalcStore";


const MainDPSpfp = () => {
    const { mainDPSId } = useCalcTabStore();
    if (!mainDPSId)
        return (<></>);

    return (
        <img src={Assets.getRole(mainDPSId)} className="w-auto h-32 max-w-none" />
    )
}

const CalcTab = () => {

    return (
        <div className="w-full flex-col h-[890px] p-2">
            <div className="flex m-auto w-fit gap-2 bg-stone-900 rounded-2xl">
                <div className="flex relative gap-2 mx-10 my-2 bg-stone-900 rounded-2xl">
                    <div className="relative h-[840px] my-2">
                        <div className="flex flex-col bg-stone-950 shadow-inner border-2 border-stone-800 border-opacity-75 rounded-xl">
                            <TerminalLabel />
                            <div className="h-[400px]">

                            </div>
                        </div>
                        <div className="absolute size-32 bottom-4 left-0">
                            <MainDPSpfp />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default CalcTab