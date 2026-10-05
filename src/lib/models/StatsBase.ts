import { AttributeID, Stats } from "../constants";
import { AttrValues } from './../constants';
import { Character } from "./Character";
import { WengineStatsType } from "./WEngine";

export const viewStatsChar = (charStats: Character) => {
    const stats: Stat[] = [];

    Object.entries(charStats.charSum).forEach(([id, value]) => {
        const stat: Stat = new Stat();
        const exceptionStats: number[] = [AttributeID.ENERGY_RATE, AttributeID.ANOMALY_MAST, AttributeID.IMPACT];
        const idAux: AttrValues = exceptionStats.includes(Number(id)) ? <AttrValues>(Number(id) + 1) : <AttrValues>+id;

        if (!Object.values(Stats).includes(idAux))
            return;

        if ((charStats.discSet.sumStats[idAux] === 0) && (idAux !== AttributeID.SHEER_FORCE))
            return;

        stat.id = <AttrValues>+id;
        if (Math.round(value) !== 0) {
            stat.value = value;
            stats.push(stat);
        }
    });
    return stats;
}

export const viewStats = (wengineStats: WengineStatsType): Stat[] => {
    const stats: Stat[] = [];

    Object.entries(wengineStats).forEach(([id, value]) => {
        const stat: Stat = new Stat();
        if (!Object.values(Stats).includes(<AttrValues>+id))
            return;

        stat.id = <AttrValues>+id;
        if (Math.round(value) !== 0) {
            stat.value = value;
            stats.push(stat);
        }
    });

    return stats
}

export type StatBaseType = Record<AttrValues, number>

export const createEmptyStatBaseObject = () => {
    const statsBase = {} as Record<AttrValues, number>;
    for (const s of Stats)
        statsBase[s] = 0;

    return statsBase
}

export class Stat {
    id: AttrValues = 0
    value: number = 0
}



// interface StatsBase extends StatBaseType { }

// export class StatsBaseImpl implements StatsBase {
//     constructor() {
//         Object.values(AttributeID).forEach((stat_id:AttrValues) => {
//             this[stat_id] = 0;
//         })
//         for (const stat_id in Stats) {
//             this[stat_id] = 0;
//         }
//     }

//     add(name: AttributeName, value: number) {
//         this[name] += value;
//     }
// }

// export class StatsBase implements BasicStatsObject {
//     [AttributeID.NONE]: number = 0.0;
//     [AttributeID.HP]: number = 0.0;
//     [AttributeID.HP_P]: number = 0.0;
//     [AttributeID.HP_FLAT]: number = 0.0;
//     [AttributeID.SHIELD_P]: number = 0.0;
//     [AttributeID.SHIELD_FLAT]: number = 0.0;
//     [AttributeID.ATK]: number = 0.0;
//     [AttributeID.ATK_P]: number = 0.0;
//     [AttributeID.ATK_FLAT]: number = 0.0;
//     [AttributeID.DEF]: number = 0.0;
//     [AttributeID.DEF_P]: number = 0.0;
//     [AttributeID.DEF_FLAT]: number = 0.0;
//     [AttributeID.IMPACT]: number = 0.0;
//     [AttributeID.IMPACT_P]: number = 0.0;
//     [AttributeID.SHEER_FORCE]: number = 0.0;
//     [AttributeID.SHEER_FORCE_FLAT]: number = 0.0;
//     [AttributeID.CRIT_RATE]: number = 0.0;
//     [AttributeID.CRIT_RATE_FLAT]: number = 0.0;
//     [AttributeID.CRIT_DMG]: number = 0.0;
//     [AttributeID.CRIT_DMG_FLAT]: number = 0.0;
//     [AttributeID.SHARP_CRIT_DMG]: number = 0.0;
//     [AttributeID.SHARP_CRIT_DMG_FLAT]: number = 0.0;
//     [AttributeID.PEN]: number = 0.0;
//     [AttributeID.PEN_P]: number = 0.0;
//     [AttributeID.PEN_FLAT]: number = 0.0;
//     [AttributeID.ENERGY_RATE]: number = 0.0;
//     [AttributeID.ENERGY_P]: number = 0.0;
//     [AttributeID.ENERGY_REGEN_FLAT]: number = 0.0;
//     [AttributeID.ANOMALY_PROF]: number = 0.0;
//     [AttributeID.ANOMALY_PROF_FLAT]: number = 0.0;
//     [AttributeID.ANOMALY_MAST]: number = 0.0;
//     [AttributeID.ANOMALY_MAST_P]: number = 0.0;
//     [AttributeID.ANOMALY_MAST_FLAT]: number = 0.0;
//     [AttributeID.PHYS_DMG]: number = 0.0;
//     [AttributeID.PHYS_DMG_FLAT]: number = 0.0;
//     [AttributeID.FIRE_DMG]: number = 0.0;
//     [AttributeID.FIRE_DMG_FLAT]: number = 0.0;
//     [AttributeID.ICE_DMG]: number = 0.0;
//     [AttributeID.ICE_DMG_FLAT]: number = 0.0;
//     [AttributeID.ELEC_DMG]: number = 0.0;
//     [AttributeID.ELEC_DMG_FLAT]: number = 0.0;
//     [AttributeID.ETHER_DMG]: number = 0.0;
//     [AttributeID.ETHER_DMG_FLAT]: number = 0.0;
//     [AttributeID.WIND_DMG]: number = 0.0;
//     [AttributeID.WIND_DMG_FLAT]: number = 0.0;
//     [AttributeID.ADRENALINE_ACC]: number = 0.0;
//     [AttributeID.ADRENALINE_ACC_P]: number = 0.0;
//     [AttributeID.ADRENALINE_ACC_FLAT]: number = 0.0;
//     [AttributeID.SHEER_DMG_BONUS]: number = 0.0;
//     [AttributeID.SHEER_DMG_BONUS_FLAT]: number = 0.0;
//     [AttributeID.SHIELD_EFFECT]: number = 0.0;
// }
