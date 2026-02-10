import { ParamValue } from "../types/hakushin_types"

export interface SkillKit {
    [id: string]: Skill
}

export type Skill = {
    level: number,
    SkillId: number,
    subSkills: SubSkill[]
}

export type SubSkill = {
    name: string,
    hitsData: HitData[],
}

//esse tipo terá que ser modificado caso precisarmos do stunRatio
export type HitData = {
    name: string,
    desc: string,
    dmgPecent: number,
    anomalyType: number,
    params: { [key: string]: ParamValue },
}

export class SkillCalc {
    skillKit: SkillKit
    dictSkillsMult = {}

    constructor(skillKit: SkillKit) {
        this.skillKit = skillKit;
    }

    public calcAllSkillsMult() {
        Object.entries(this.skillKit).forEach(([id, skill]) => {
            const skillCalculated = skill;

            skillCalculated.subSkills = skill.subSkills.map((subSkill) => {

                subSkill.hitsData = subSkill.hitsData.map((hitData) => {
                    hitData.dmgPecent = this.mountSkillMult(hitData, skill.level);
                    return hitData;
                });

                return subSkill;
            });

            this.skillKit[id] = skillCalculated;
        });

        return this.skillKit;
    }

    private mountSkillMult(hitData: HitData, lvl: number) {
        const captureTxtInBraces = /\{(.*?)\}/g;

        const resultado = hitData.desc.replace(captureTxtInBraces, (_match, capture) => {
            const json = JSON.parse(this.fixJson(capture));
            return this.subSkillMult(hitData.params[json.Skill], lvl);
        });

        return eval(resultado.replace("}", ""));
    }

    private fixJson(jsonBroken: string) {
        const fixCurlyBrackets = "{" + jsonBroken.replace("{", "") + "}";
        const fixQuotationMark = fixCurlyBrackets.replace('Skill', '"Skill"').replace('Prop', '"Prop"');
        return fixQuotationMark;
    }

    private subSkillMult(paramValue: ParamValue, lvl: number) {
        return String((paramValue.Main + paramValue.Growth * (lvl - 1)) / 100);
    }
}