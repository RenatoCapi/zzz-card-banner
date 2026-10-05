import discsetData from "../../data/discset_data.json";
import { AttrValues, DiscMainStatsID, DiscSubStatsID } from "../constants";
import { DiscsetData } from "../types/discset_data_types";
import { createEmptyStatBaseObject, StatBaseType } from "./StatsBase";

export class MainStat {
    id: DiscMainStatsID = 0
    value: number = 0
}

export class SubStat {
    id: DiscSubStatsID = 0
    value: number = 0
}


export class Disc {
    lvl: number = -1
    pos: number = 0
    rarity: number = 0
    equipset_id: number = 0
    main_stats: MainStat = new SubStat()
    substats: SubStat[] = []
}

export class DiscSet {
    private readonly discsetData = discsetData;
    discs: Record<number, Disc> = {};
    disc_sets_bonus: { [setid: number]: number } = {};
    sumStats: StatBaseType = createEmptyStatBaseObject()

    constructor() {
        this.emptyDiscSet();
    }

    public emptyDiscSet() {
        Array(6).forEach((_, index) => {
            this.discs[index] = new Disc();
        });
    }

    public sumDiscs(): StatBaseType {
        this.sumStats = createEmptyStatBaseObject()
        const discsetData = <DiscsetData>this.discsetData;

        Object.values(this.discs).forEach((value) => this.sumDiscStats(value));

        Object.entries(this.disc_sets_bonus).forEach(([disc_id, numSet]) => {
            if (numSet >= 2) {
                const [[stat_id, stat_value]] = Object.entries(discsetData[disc_id].setProp2pc);
                const statId = <AttrValues>+stat_id;
                this.sumStats[statId] += stat_value;
                console.log(statId + " - " + stat_value)
            }
        })

        return this.sumStats;
    }

    private sumDiscStats(disc: Disc) {
        const mainStats: MainStat = disc.main_stats;
        this.sumStats[mainStats.id as AttrValues] += mainStats.value;

        for (const stat of disc.substats) {
            this.sumStats[stat.id as AttrValues] += stat.value;
        }
    }
}