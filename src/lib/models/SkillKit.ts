import { DataSkill } from './../types/my_char_data_types';

import { SkillReadable } from "../constants";
import { DataCoreSkill, DataMultiplier, HitMap } from "../types/my_char_data_types";

export interface SkillDict {
    [id: string]: Skill
}

export type Skill = {
    level: number,
    SkillId: number,
    data: DataSkill | DataCoreSkill,
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
    skillDict: SkillDict
    hitMap: HitMap
    calculatedHits: CalculatedHitMap = {}

    constructor(dataSkillKit: SkillDict, hitMap: HitMap) {
        this.skillDict = dataSkillKit;
        this.hitMap = hitMap;
    }

    calcAllComplexHits() {
        Object.entries(this.skillDict).forEach(([skillId, skill]) => {
            this.calculatedHits[SkillReadable[+skillId]] = {}
            if ("subSkills" in skill.data) {
                Object.entries(skill.data.subSkills).forEach(([subSkillId, subSkill]) => {
                    this.calculatedHits[SkillReadable[+skillId]][subSkillId.toString()] = {};
                    Object.entries(subSkill).forEach(([dataComplexId, dataComplex]) => {
                        this.calculatedHits[SkillReadable[+skillId]][subSkillId.toString()][dataComplexId] = {
                            dmg: this.calcMultPerLvl(dataComplex.dmg, skill.level),
                            daze: this.calcMultPerLvl(dataComplex.daze, skill.level),
                            //TODO 
                            anomalyBuildup: 0,
                            miasmaDepletion: 0,
                        }
                    })

                })
            } else {
                delete this.calculatedHits[SkillReadable[+skillId]]
            }
        })
    }

    calcMultPerLvl(dataMult: DataMultiplier, lvl: number) {
        return (dataMult.base + (dataMult.growth * (lvl - 1))) / 10000;
    }
}