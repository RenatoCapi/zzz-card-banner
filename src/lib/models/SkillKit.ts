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
            const skill_name = SkillReadable[+skillId];
            this.calculatedHits[skill_name] = {}

            if ("subSkills" in skill.data) {
                Object.entries(skill.data.subSkills).forEach(([subSkillId, subSkill]) => {
                    let newSubId = subSkillId.toLowerCase().replace(/\s/g, "-");
                    const subSkillPattern = new RegExp(skill_name + "-attack:-", "g");
                    newSubId = newSubId.replace(subSkillPattern, "");
                    newSubId = newSubId.replace(/stats/g, "")
                    this.calculatedHits[skill_name][newSubId] = {};

                    Object.entries(subSkill).forEach(([dataComplexId, dataComplex]) => {
                        let newComplexId = dataComplexId.toLowerCase().replace(/\s/g, "-");
                        if (subSkillId === dataComplexId)
                            newComplexId = "attack";

                        const simpleHitId = Object.keys(this.hitMap).find(
                            hitId => hitId === dataComplex.hitID[0]
                        );
                        const buildup = simpleHitId ? this.hitMap[simpleHitId].anomalyBuildup : 0;

                        this.calculatedHits[skill_name][newSubId][newComplexId] = {
                            dmg: this.calcMultPerLvl(dataComplex.dmg, skill.level),
                            daze: this.calcMultPerLvl(dataComplex.daze, skill.level),
                            //TODO 
                            anomalyBuildup: buildup,
                            miasmaDepletion: 0,
                        }
                    })

                })
            } else {
                delete this.calculatedHits[skill_name]
            }
        });
    }

    calcMultPerLvl(dataMult: DataMultiplier, lvl: number) {
        return (dataMult.base + (dataMult.growth * (lvl - 1))) / 10000;
    }
}