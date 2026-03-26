import { useEffect } from "react";
import { Assets } from "../../../lib/assets";
import { HOYO_DISC_SUB_RATE, StatsToReadableMin } from "../../../lib/constants";
import { Disc, DiscSet, Stat } from "../../../lib/models/DiscSet";
import { isFlat } from "../../../lib/Utils";
import { idDOMcustom } from "../charStatPreview/StatHoverEvent";

type StatProp = {
    stat: Stat
}

type DiscSetProp = {
    discSet: DiscSet
}

type DiscProp = {
    disc: Disc
}


const DiscSetPreview = ({ discSet }: DiscSetProp) => {
    if (!discSet) {
        return (<div className="flex w-107 gap-2 flex-wrap"></div>)
    }

    return (
        <div className="flex flex-col w-107 h-187.75 gap-2 flex-wrap">
            <DiscCard disc={discSet.discs[1]} />
            <DiscCard disc={discSet.discs[2]} />
            <DiscCard disc={discSet.discs[3]} />
            <DiscCard disc={discSet.discs[6]} />
            <DiscCard disc={discSet.discs[5]} />
            <DiscCard disc={discSet.discs[4]} />
        </div>
    )
}

const DiscCard = ({ disc }: DiscProp) => {
    if (!disc)
        disc = new Disc();

    const url = Assets.getDiscSetById(disc.equipset_id)

    return (
        <div className="card-primary w-52.5 h-61.25 p-6" >
            <div className="relative z-20">
                <img src={url} className="absolute w-50 max-w-none -top-20 -right-18 z-10 opacity-40 blur-[2px] select-none" />
                <DiscStatsSummary disc={disc} />
            </div>
        </div >
    )
}

const DiscStatsSummary = ({ disc }: DiscProp) => {
    if (disc.lvl === -1)
        return (
            <></>
        );

    return (
        <div className="absolute z-30 w-38.5">
            <div className="w-full h-full items-center">
                <div className="flex justify-between items-center">
                    <img src={Assets.getRarity(disc.rarity)} className="w-8.5 h-auto" />
                    <div className="flex flex-col self-center">
                        <span className="text-stat-zzz text-[17px]">Lv.{disc.lvl}</span>
                    </div>
                </div>
                <div className="divider-base divider-disc" />
                <DiscMainStat stat={disc.main_stats} />
                <div className="divider-base divider-disc" />
                {disc.substats.map((stat, index) => (
                    <DiscSubStat stat={stat} key={index} />
                ))}
            </div>
        </div>
    )
};


const DiscMainStat = ({ stat }: StatProp) => {
    const idString = "id" + String(stat.id).slice(0, -1);
    useEffect(() => idDOMcustom(idString), [idString]);

    return (
        <div className={idString + ` flex justify-between pr-1 rounded-md border-stone-700`}>
            <img src={Assets.getStatIcon(stat)} className="w-3.5 h-3.5 m-1" />
            <span className="text-stat-zzz">
                {StatsToReadableMin[stat.id]}
            </span >
            <div className="divider-base divider-text" />
            <span className="text-stat-zzz">
                {isFlat(stat)}
            </span>
        </div>
    )
}

const DiscSubStat = ({ stat }: StatProp) => {
    const idString = "id" + String(stat.id).slice(0, -1);
    useEffect(() => idDOMcustom(idString), [idString]);

    return (
        <div className={idString + ` flex justify-between pr-1 rounded-md  border-stone-700`} >
            <img src={Assets.getStatIcon(stat)} className="w-3.5 h-3.5 m-1" />
            <span className="text-stat-zzz">
                {StatsToReadableMin[stat.id]}
            </span >
            <div className="flex grow justify-end" >
                <div className="flex mx-1">
                    <span className="self-center text-stat-zzz tracking-widest text-amber-500">
                        {numUpgrades(stat)}
                    </span >
                </div>

            </div>
            <span className="text-stat-zzz">
                {isFlat(stat)}
            </span>
        </div>
    )
}

const numUpgrades = (stat: Stat) => {
    const upgrades = (stat.value / HOYO_DISC_SUB_RATE[stat.id]) - 1;
    return "·".repeat(upgrades);
}


export default DiscSetPreview