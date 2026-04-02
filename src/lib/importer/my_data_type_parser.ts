import { Character } from "../models/Character";
import { CharMetadata } from "../models/CharMetadata";
import { SkillDict } from "../models/SkillKit";
import { StatsBase } from "../models/StatsBase";
import { BasicStatsObject } from "../types/basic_stats_object";
import { DataCharMap, DataCharType, DataGrowthStat } from "../types/my_char_data_types";
import { AttrValues, HOYO_SkillID, StatsFloatNumber } from './../constants';


export class CharacterBuilder {
    character: Character
    lvl: number
    char_raw: DataCharType

    constructor(id: number, lvl: number, skillDict: SkillDict) {
        this.lvl = lvl;
        this.character = new Character();

        this.character.skillKit.skillDict = skillDict;
        this.char_raw = ServiceMyDataType.instance.getChar(id);
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
        const core_lvl = this.character.skillKit.skillDict[HOYO_SkillID.CORE].level;

        if (core_lvl === 1) return;

        const core_stats = Object.entries(this.char_raw.coreSkill.coreGrowthStat);
        const growth_attr1 = Math.floor((core_lvl) / 2)
        const growth_attr2 = Math.floor((core_lvl - 1) / 2)

        const attrId1 = <AttrValues>+core_stats[1][0]
        const attrId2 = <AttrValues>+core_stats[0][0]
        if (StatsFloatNumber.includes(attrId1)) {
            core_stats[1][1] /= 10000;
        }

        this.character.charBase[attrId1] += core_stats[1][1] * growth_attr1
        this.character.charBase[attrId2] += core_stats[0][1] * growth_attr2
    }

    private setCharMetadata() {
        const charMetadata = new CharMetadata();
        //TODO refactor rarity's ID and multi hitType
        this.character.name = this.char_raw.name;
        charMetadata.rarity = +this.char_raw.rarity;
        charMetadata.weapon = +this.char_raw.weaponType;
        charMetadata.elementId = +this.char_raw.ElementType;
        charMetadata.hitType = +this.char_raw.hitType[0];
        charMetadata.camp = +this.char_raw.camp;
        this.character.charMetadata = charMetadata;

    }


    private setSkillsMetadata() {
        Object.entries(this.char_raw.skillKit).forEach(([key, value]) => {
            this.character.skillKit.skillDict[+key].data = value;
        });
        this.character.skillKit.hitMap = this.char_raw.hitMap;
        this.character.skillKit.calcAllComplexHits();
    }

    private calc_stat_growth(stat: DataGrowthStat, lvl: number): number {
        const asc_stat = Math.trunc((lvl - 1) / 10) * stat.asc
        return Math.round(stat.base + (this.lvl - 1) * (stat.growth / 10000) + asc_stat);

    }
}

export class ServiceMyDataType {
    static #instance: ServiceMyDataType
    json!: DataCharMap;
    charBase: DataCharMap = {};

    private constructor() { }

    public static get instance(): ServiceMyDataType {
        if (!ServiceMyDataType.#instance) {
            ServiceMyDataType.#instance = new ServiceMyDataType();
        }

        return ServiceMyDataType.#instance;
    }

    async loadData() {
        ServiceMyDataType.#instance.json = await loadDataChars();
    }

    getChar(id: number) {
        return this.json[id];
    }
}

const loadDataChars = async () => {
    return (await import("../../data/game_data.json")).default;
}