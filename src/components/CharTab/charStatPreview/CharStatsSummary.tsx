
import { Key } from "react";
import discset_data from "../../../data/base_discset_data.json";
import { Assets } from "../../../lib/assets";
import { Character } from "../../../lib/models/Character";
import { Stat } from "../../../lib/models/DiscSet";
import { viewStats, viewStatsChar } from "../../../lib/models/StatsBase";
import { WEngine } from "../../../lib/models/WEngine";
import { dataDiscSetsMeta as DataDiscSetsMeta } from "../../../lib/types/discs_metadata";
import StatRow from "./StatRow";

const WEngineIcon = (props: { wengine: WEngine }) => {
    const { wengine } = props;
    const wengine_icon = Assets.getWEngine(wengine.id);
    const wengine_rarity = Assets.getRarity(wengine.rarity);

    return (
        <div className="relative w-18 h-18">
            <img src={wengine_rarity} className="absolute w-7 h-auto bottom-0 right-0" />
            <img src={wengine_icon} height="72px" />
        </div>
    );
}

const WEngineStats = (props: { wengine: WEngine }) => {
    const { wengine } = props;
    const wengine_stats = viewStats(wengine.stats);
    const wengine_lvl = (wengine.lvl === -1) ? "" : "Lv." + wengine.lvl;
    const wengine_stars = (wengine.star === 0) ? "" : "R" + wengine.star;
    return (
        <div className="flex flex-col justify-between gap-1.5 w-47.5 ml-2" key="wengine_stats">
            <span className="px-1 text-balance">{wengine.name}</span>
            {wengine_stats.map((stat: Stat, reactId: Key | null | undefined) =>
                <StatRow stat={stat} key={reactId} />
            )}
            <div className="relative flex left-6 gap-2">

                <span className="text-stat-zzz">{wengine_lvl}</span>
                <span className="text-stat-zzz">{wengine_stars}</span>
            </div>
        </div>
    );
}
const CharStatSummary = ({ char }: { char: Character | null }) => {
    if (!char) char = new Character();

    const { wengine } = char;
    const total_stats = viewStatsChar(char);
    const camp = Assets.getCamp(char.charMetadata.camp);
    const disc_set_bonus = Object.entries(char.discSet.disc_sets_bonus)
        .filter(value => (value[1] === 2 || value[1] === 4));

    const discs_meta: DataDiscSetsMeta = discset_data;




    return (
        <div className="flex flex-col justify-center gap-2 items-center h-187.5">
            <div className="flex justify-center w-68.75" key='faction'>
                <img src={camp} className="w-45 h-auto" />
            </div>
            <div key='wengine'>
                <div className="flex justify-between w-68.75 p-2.5">
                    <WEngineIcon wengine={wengine} />
                    <WEngineStats wengine={wengine} />
                </div>
            </div>
            <div className="w-68.75 p-2.5 self-center" key='mainStats'>
                <div className="flex flex-col justify-stretch gap-1" key={char.id}>
                    {total_stats.map((stat: Stat, reactId) =>
                        <StatRow stat={stat} key={reactId} />
                    )}
                </div>
            </div>
            <div key='bonusSets' className="w-68.75 px-2.5 self-center">
                {disc_set_bonus.map(([id, value]) =>
                    <div key={id} className="flex flex-row justify-between px-2 self-stretch">
                        <span className="text-[15px]">{discs_meta[+id].EN.name}</span>
                        <div className="flex border border-dashed box-border clear-both opacity-15 grow my-auto mx-2.5 " />
                        <span className="text-[15px]"> {value}pc</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CharStatSummary