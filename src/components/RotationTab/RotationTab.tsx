import { Assets } from "../../lib/assets";
import { TerminalInputText } from "./TerminalInput";
import { useCalcTabStore } from "./UseCalcStore";


const RotationTab = () => {
    const { dps } = useCalcTabStore();

    return (
        <div className="w-full flex-col box-border p-2 pb-0 min-h-full">
            <div className="flex m-auto w-fit h-full gap-2 bg-stone-900 rounded-2xl">
                <div className="flex relative gap-2 m-2 bg-stone-900 rounded-2xl">
                    <div className="relative grid grid-rows-4 gap-2 h-[840px] my-2 ">
                        <div className="relative h-full row-span-2 mx-2 bg-stone-950 shadow-inner border-2 border-stone-800/75 rounded-xl ">
                            <TerminalInputText />
                            <div className="grid grid-cols-2 h-[calc(100%-70px)]">
                                <LogHistoryLabel />
                                <LogRotationList />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <span className="card-primary">
                                {dps ? "DPS: " + dps : ""}
                            </span>
                            <span className="card-primary"></span>
                            <span className="card-primary"></span>
                        </div>
                        <div className="flex flex-row items-end m-2">
                            <TeammatePfp />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

const LogRotationList = () => {
    const { rotationList } = useCalcTabStore();

    return (
        <div className="flex flex-col items-end mr-4 pb-1 h-full overflow-auto scrollbar-thin">
            {rotationList.map(({ char, hit, dmg }, index) => (
                <div key={index} className="flex flex-row items-end h-fit gap-2 ">
                    <div className="flex flex-col py-1 items-end">
                        <div className="text-stone-200/50 text-[11px] ">{char}</div>
                        <div className="text-stone-200/80 text-[14px]">{hit}</div>
                    </div>
                    <div className="p-1 self-center text-center min-w-[78px] text-orange-100/90">{dmg}%</div>
                </div>
            ))}
        </div>
    );
}

const LogHistoryLabel = () => {
    const { logHistory } = useCalcTabStore();
    const style = ` text-[14px] tracking-[0.5px] leading-normal`;
    const isError = (code: number) => ((code ? `text-lime-500` : `text-red-500`) + style);

    return (
        <div className="flex flex-col ml-4 pb-1 h-full overflow-auto scrollbar-thin">
            {logHistory.map(({ code, msg, cmd }, index) => (
                <div key={index} className="p-1">
                    <div className="text-stone-200/50 text-[11px] ">&#35; {cmd}</div>
                    <div className={isError(code)}>{msg}</div>
                </div>
            ))}
        </div>
    );
}

const TeammatePfp = () => {
    const { teammatesId } = useCalcTabStore();
    if (teammatesId.length === 0)
        return (<></>);

    return (
        <>
            {teammatesId.map((id, index) => (
                <img key={index} src={Assets.getRole(id)} className="w-auto h-[104px] max-w-none" />
            ))}
        </>

    )
}

export default RotationTab

