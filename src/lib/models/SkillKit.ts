
import { DataComplexHit, DataMultiplier, DataSkill, HitMap } from "../types/my_char_data_types";

export interface MySkillKit {
    [id: string]: Skill
}

export type Skill = {
    level: number,
    SkillId: number,
    data: DataSkill,
}

interface CalculatedHitMap {
    [skillId: string]: {
        [subskillId: string]: {
            [complexHitId: string]: {
                dmg: number
                daze: number
                anomalyBuildup: number
                miasmaDepletion: number
            }
        }
    }
}

// interface CalculatedHit {
//     skillId: string
//     subskillId: string
//     complexHitId: string
//     dmg: number
//     daze: number
//     anomalyBuildup: number
//     miasmaDepletion: number
// }

export function subSkillMult(complexSkill: DataComplexHit, lvl: number) {
    return String((complexSkill.dmg.base + complexSkill.dmg.growth * (lvl - 1)) / 10000);
}

class Skillkit {
    dataSkillKit: MySkillKit
    hitMap: HitMap
    calculatedHits: CalculatedHitMap = {}

    constructor(dataSkillKit: MySkillKit, hitMap: HitMap) {
        this.dataSkillKit = dataSkillKit
        this.hitMap = hitMap
        this.calcAllComplexHits()
    }

    private calcAllComplexHits() {
        Object.entries(this.dataSkillKit).forEach(([skillId, skill]) => {
            Object.entries(skill.data.subSkills).forEach(([subSkillId, subSkill]) => {
                Object.entries(subSkill).forEach(([dataComplexId, dataComplex]) => {
                    this.calculatedHits[skillId][subSkillId][dataComplexId] = {
                        dmg: this.calcMultPerLvl(dataComplex.dmg, skill.level),
                        daze: this.calcMultPerLvl(dataComplex.daze, skill.level),
                        anomalyBuildup: 0,
                        miasmaDepletion: 0,
                    }
                })
            })
        })
    }


    calcMultPerLvl(dataMult: DataMultiplier, lvl: number) {
        return (dataMult.base + (dataMult.growth * (lvl - 1))) / 10000
    }
}