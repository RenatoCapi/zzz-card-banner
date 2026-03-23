import { useEffect } from "react";
import { Assets } from "../../../lib/assets";
import { StatsToReadableMin } from "../../../lib/constants";
import { Stat } from "../../../lib/models/DiscSet";
import { isFlat } from "../../../lib/Utils";
import { idDOMcustom } from "../discSetPreview/DiscSetPreview";


export const iconSize = 16

type StatProp = {
    stat: Stat
}

const StatRow = ({ stat }: StatProp) => {
    const idString = "id" + String(stat.id).slice(0, -1);
    useEffect(() => idDOMcustom(idString), []);

    return (
        <div className={idString + ` flex justify-between self-stretch rounded-lg pr-1`}>
            <img className="w-4 h-4 m-1 select-none" src={Assets.getStatIcon(stat)} />
            <span className="font-['zzz'] text-[17px]">{StatsToReadableMin[stat.id]}</span>
            <div className="flex border border-dashed box-border clear-both opacity-15 grow my-auto mx-2.5 " />
            <span className="font-['zzz'] text-[17px]"> {isFlat(stat)} </span>
        </div>
    )
}
export default StatRow