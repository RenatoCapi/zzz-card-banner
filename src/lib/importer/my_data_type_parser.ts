import gameData from "../../data/game_data.json";
import { Character } from "../models/Character";
import { CharMetadata } from "../models/CharMetadata";
import { MySkillKit } from "../models/SkillKit2nd";
import { StatsBase } from "../models/StatsBase";
import { BasicStatsObject } from "../types/basic_stats_object";
import { DataCharMap, DataCharType, DataGrowthStat } from "../types/my_char_data_types";
import { AttrValues, HOYO_SkillID, StatsFloatNumber } from './../constants';

export class CharacterBuilder {
    character: Character
    lvl: number
    char_raw: DataCharType

    constructor(id: number, lvl: number, skillKit: MySkillKit) {
        this.lvl = lvl;
        this.character = new Character();

        this.character.skillKit = skillKit;
        this.char_raw = new ServiceMyDataType().getChar(id.toString());

    }

    public build() {
        this.setStatsBase();
        this.setCoreStatsBase();
        this.setCharMetadata();
        this.setSkillsMetadata();
        return this.character;
    }

    private setStatsBase() {
        const base_char: BasicStatsObject = new StatsBase();
        Object.entries(this.char_raw.growthStat).forEach(([key_raw, value]) => {
            const key = <AttrValues>+key_raw;
            base_char[key] = this.calc_stat_growth(value, this.lvl);
        });
        Object.entries(this.char_raw.staticStats).forEach(([key_raw, value]) => {
            const key = <AttrValues>+key_raw;
            base_char[key] = StatsFloatNumber.includes(key) ? value / 10000 : value;

        });

        this.character.charBase = base_char;
        this.character.lvl = this.lvl;
    }


    private setCoreStatsBase() {
        const core_lvl = this.character.skillKit[HOYO_SkillID.CORE].level;

        if (core_lvl === 1) return;

        const core_stats = Object.entries(this.char_raw.coreSkill.coreGrowthStat);
        const growth_attr1 = Math.floor((core_lvl) / 2)
        const growth_attr2 = Math.floor((core_lvl - 1) / 2)

        const attrId1 = <AttrValues>+core_stats[1][0]
        const attrId2 = <AttrValues>+core_stats[0][0]
        console.log(core_stats)
        if (StatsFloatNumber.includes(attrId1)) {
            core_stats[1][1] /= 10000;
            console.log(core_stats[1][1])
        }

        this.character.charBase[attrId1] += core_stats[1][1] * growth_attr1
        this.character.charBase[attrId2] += core_stats[0][1] * growth_attr2
    }

    private setCharMetadata() {
        const charMetadata = new CharMetadata();
        //TODO refactor rarity's ID and multi hitType
        this.character.name = this.char_raw.name;
        console.log(this.character.name)

        charMetadata.rarity = this.char_raw.rarity === "3" ? "A" : "S";
        charMetadata.weapon = this.char_raw.weaponType;
        charMetadata.elementId = this.char_raw.ElementType;
        charMetadata.hitType = this.char_raw.hitType[0];
        charMetadata.camp = this.char_raw.camp;
        this.character.charMetadata = charMetadata;

    }


    private setSkillsMetadata() {
        let skillKit: MySkillKit = this.character.skillKit;
        Object.entries(this.char_raw.skillKit).forEach(([key, value]) => {
            skillKit[+key].data = value
        });
    }



    private calc_stat_growth(stat: DataGrowthStat, lvl: number): number {
        const asc_stat = Math.trunc((lvl - 1) / 10) * stat.asc
        return Math.floor(stat.base + (this.lvl - 1) * (stat.growth / 10000)) + asc_stat;
    }



}

export class ServiceMyDataType {
    json: DataCharMap;
    charBase: DataCharMap = {};

    constructor() {
        this.json = <DataCharMap>gameData;
    }

    public getChar(id: string) {
        return this.json[id]
    }

    public load_all_characters() {
        Object.keys(this.json).forEach((key) => {
            const new_key = this.json[key].name;
            this.charBase[new_key] = this.json[key];
        });
    }

}