import gameData from "../../data/base_data_characters.json"
import { AttributeID, ElementTypeID, HOYO_SkillID } from "../constants"
import { Character } from "../models/Character"
import { CharMetadata } from "../models/CharMetadata"
import { HitData, SkillCalc, SkillKit, SubSkill } from "../models/SkillKit"
import { StatsBase, StatsBaseKeys } from "../models/StatsBase"
import { BasicStatsObject } from "../types/basic_stats_object"
import { Avatar, DamageParam, Hakushin_data, Hakushin_data as HakushinData, SkillHaku } from "../types/hakushin_types"
import { TRUNCATE_STATS } from "../Utils"


export class CharacterBuilder {
    character: Character
    lvl: number
    char_raw: Avatar

    constructor(id: number, lvl: number, skillKit: SkillKit) {
        this.lvl = lvl;
        this.character = new Character();
        this.character.name = (<Hakushin_data>gameData)[id].Name;
        console.log(this.character.name);
        this.character.skillKit = skillKit;
        this.char_raw = new ServiceHakushin().getChar(this.character.name);
    }

    public build() {
        this.setStatsBase();
        this.setCoreStatsBase();
        this.setCharMetadata();
        this.setSkillsMetadata();
        return this.character;
    }

    private setCharMetadata() {
        const charMetadata = new CharMetadata();
        charMetadata.rarity = this.char_raw.Rarity === 3 ? "A" : "S";
        charMetadata.weapon = Object.keys(this.char_raw.WeaponType)[0];
        charMetadata.elementId = Object.keys(this.char_raw.ElementType)[0];
        charMetadata.hitType = Object.keys(this.char_raw.HitType)[0];
        charMetadata.camp = Object.keys(this.char_raw.Camp)[0];
        this.character.charMetadata = charMetadata;

    }

    private setStatsBase() {
        const base_char: BasicStatsObject = new StatsBase();
        const stats = this.char_raw.Stats;
        const lvl_range = this.get_lvl_range();
        console.log(stats);
        base_char[AttributeID.ATK] = this.calc_stat_growth(stats.Attack, stats.AttackGrowth, this.char_raw.Level[lvl_range].Attack);
        base_char[AttributeID.HP] = this.calc_stat_growth(stats.HpMax, stats.HpGrowth, this.char_raw.Level[lvl_range].HpMax) + 1;
        base_char[AttributeID.DEF] = this.calc_stat_growth(stats.Defence, stats.DefenceGrowth, this.char_raw.Level[lvl_range].Defence);
        base_char[AttributeID.ANOMALY_PROF] = stats.ElementMystery;
        base_char[AttributeID.ANOMALY_MAST] = stats.ElementAbnormalPower;
        base_char[AttributeID.CRIT_RATE] = stats.Crit / 100;
        base_char[AttributeID.CRIT_DMG] = stats.CritDamage / 100;
        base_char[AttributeID.IMPACT] = stats.BreakStun;
        base_char[AttributeID.ENERGY_RATE] = stats.SpRecover / 100;
        base_char[AttributeID.PEN_P] = stats.PenRate / 100;
        this.character.charBase = base_char;
        this.character.lvl = this.lvl;
    }

    private setSkillsMetadata() {
        let skillKit: SkillKit = this.character.skillKit;

        skillKit[HOYO_SkillID.BASIC].subSkills = this.loadBasicAtkSkill(this.char_raw.Skill.Basic);
        skillKit[HOYO_SkillID.DODGE].subSkills = this.loadSubSkills(this.char_raw.Skill.Dodge);
        skillKit[HOYO_SkillID.ASSIST].subSkills = this.loadSubSkills(this.char_raw.Skill.Assist);
        skillKit[HOYO_SkillID.SPECIAL].subSkills = this.loadSubSkills(this.char_raw.Skill.Special);
        skillKit[HOYO_SkillID.CHAIN].subSkills = this.loadSubSkills(this.char_raw.Skill.Chain);

        this.character.skillKit = new SkillCalc(skillKit).calcAllSkillsMult();
    }

    private loadSubSkills(skill: SkillHaku) {
        if (skill.Description === undefined)
            return [];

        let subSkills: SubSkill[] = [];

        Object.values(skill.Description).forEach((desc) => {
            if (desc.Param !== undefined) {
                const subSkill: SubSkill = {
                    name: desc.Name,
                    hitsData: this.loadParamSkills(desc.Param),
                };

                subSkills.push(subSkill);
            }
        });

        return subSkills;
    }

    private loadParamSkills(params: DamageParam[]): HitData[] {
        let hitsDataAux: HitData[] = [];
        params.forEach((hitRaw) => {
            if (hitRaw.Param !== undefined) {
                const hitAux = {
                    name: hitRaw.Name,
                    dmgPecent: 0.0,
                    anomalyType: +Object.keys(this.char_raw.ElementType)[0],
                    desc: hitRaw.Desc,
                    params: hitRaw.Param,
                }
                hitsDataAux.push(hitAux);
            }
        })

        return hitsDataAux;
    }

    private loadBasicAtkSkill(basic: SkillHaku) {
        let subBasicAtkSkills = this.loadSubSkills(basic);

        subBasicAtkSkills.forEach((_, subSkillId) => {
            subBasicAtkSkills[subSkillId].hitsData.forEach((_, hitDataId) => {
                subBasicAtkSkills[subSkillId].hitsData[hitDataId].anomalyType = ElementTypeID.PHYSICAL;
            });
        })

        return subBasicAtkSkills;
    }

    private calc_stat_growth(base: number, growth: number, asc_bonus: number) {
        return Math.floor(base + (this.lvl - 1) * growth / 10000 + asc_bonus);
    }

    private setCoreStatsBase() {
        const core_lvl = this.character.skillKit[HOYO_SkillID.CORE].level;

        if (core_lvl == 1) return;
        const core_stats = this.char_raw.ExtraLevel[core_lvl - 1].Extra;

        for (const stat in core_stats) {
            let value: number = core_stats[stat].Value;
            const prop = <StatsBaseKeys>core_stats[stat].Prop;

            if (!(Object.values(TRUNCATE_STATS).includes(prop))) {
                value /= 100;
            }

            this.character.charBase[prop] += value;
        }
    }

    private get_lvl_range() {
        return Math.ceil(this.lvl / 10);
    }
}

export class ServiceHakushin {
    json: HakushinData;
    charBase: HakushinData = {};

    constructor() {
        this.json = <HakushinData>gameData;
    }

    public getChar(name: string) {
        for (const key in this.json) {
            if (this.json[key].Name === name) {
                return this.json[key];
            }
        }

        return {} as Avatar;
    }

    public load_all_characters() {
        Object.keys(this.json).forEach((key) => {
            const new_key = this.json[key].Name;
            this.charBase[new_key] = this.json[key];
        });
    }
}