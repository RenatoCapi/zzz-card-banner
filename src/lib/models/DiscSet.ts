import { HOYO_2P_DISCSET } from "../constants"
import { StatsBase, StatsBaseKeys } from "./StatsBase"

export class Stat {
    id: StatsBaseKeys = 0
    value: number = 0
}


export class Disc {
    lvl: number = -1
    pos: number = 0
    rarity: string = ""
    equipset_id: number = 0
    main_stats: Stat = new Stat()
    substats: Stat[] = []
}


export class DiscSet {
    discs: Record<number, Disc> = {};
    disc_sets_bonus: { [setid: number]: number } = {};
    sumStats: StatsBase = new StatsBase();

    constructor() {
        this.emptyDiscSet();
    }

    public emptyDiscSet() {
        Array(6).forEach((_, index) => {
            this.discs[index] = new Disc();
        });
    }

    public sumDiscs(): StatsBase {
        this.sumStats = new StatsBase()
        Object.values(this.discs).forEach((value) => this.sumDiscStats(value));

        Object.entries(this.disc_sets_bonus).forEach(([disc_id, numSet]) => {
            if (numSet >= 2) {
                const statId = <StatsBaseKeys>HOYO_2P_DISCSET[+disc_id][0];
                this.sumStats[statId] += HOYO_2P_DISCSET[+disc_id][1];
            }
        })

        return this.sumStats
    }

    private sumDiscStats(disc: Disc) {
        const mainStats: Stat = disc.main_stats;
        this.sumStats[mainStats.id] += mainStats.value;

        for (const stat of disc.substats) {
            this.sumStats[stat.id] += stat.value;
        }
    }
}