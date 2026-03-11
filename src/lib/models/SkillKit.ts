
import { DataMultiplier, DataSkill, HitMap } from "../types/my_char_data_types";

export interface MySkillKit {
    [id: string]: Skill
}

export type Skill = {
    level: number,
    SkillId: number,
    data: DataSkill,
}

export interface CalculatedHitMap {
    [skillId: string]: {
        [subskillId: string]: {
            [complexHitId: string]: CalculatedHit
        }
    }
}

export interface CalculatedHit {
    dmg: number
    daze: number
    anomalyBuildup: number
    miasmaDepletion: number
}

export class Skillkit {
    skillDict: MySkillKit
    hitMap: HitMap
    calculatedHits: CalculatedHitMap = {}

    constructor(dataSkillKit: MySkillKit, hitMap: HitMap) {
        this.skillDict = dataSkillKit
        this.hitMap = hitMap
    }

    calcAllComplexHits() {
        Object.entries(this.skillDict).forEach(([skillId, skill]) => {
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