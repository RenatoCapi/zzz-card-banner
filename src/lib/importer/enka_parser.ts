import wengineEnkaData from "../../data/base_enkadata_wengine.json";
import wengineLabelsData from "../../data/base_wengine_data.json";
import { AttributeID, AttrValues, ENKA_RARITY, EnkaRarityKey } from "../constants";
import { Character } from "../models/Character";
import { Disc, DiscSet, Stat } from "../models/DiscSet";
import { SkillKit } from "../models/SkillKit";
import { WEngine } from "../models/WEngine";
import { AvatarEnka as EnkaAvatar, EnkaData, EquippedEnka, PropertyEnka, SkillLevelEnka, Weapon } from "../types/enka_types";
import { EnkaWEngineData } from "../types/enka_wengine_types";
import { fixPropertyId, TRUNCATE_STATS } from "../Utils";
import { CharacterBuilder } from "./hakushin_parser";

const rarityScale = {
    4: 0.2,
    3: 0.25,
    2: 0.3,
}

type rarityScaleKeys = keyof typeof rarityScale;

export class ServiceEnka {
    agent_UID: string = ""
    characterList: Character[] = []
    enkaAvatar: EnkaAvatar

    constructor(json: EnkaAvatar) {
        this.enkaAvatar = json;
    }

    public buildCharacter() {
        if (this.enkaAvatar === undefined)
            return new Character();


        const character: Character = this.getCharacterBaseData(this.enkaAvatar);
        console.log(this.enkaAvatar.Weapon);
        character.setWengine(ServiceEnkaWengine.load_engine(<Weapon>this.enkaAvatar.Weapon));
        character.setDiscSet(ServiceDiscset.buildDiscSet(<EquippedEnka[]>this.enkaAvatar.EquippedList));
        character.rank = this.enkaAvatar.TalentLevel;
        character.id = this.enkaAvatar.Id;
        character.calcAllStats();

        return character;
    }

    private getCharacterBaseData(avatar: EnkaAvatar) {
        const skillSet = this.getSkillSet(avatar.SkillLevelList);
        return new CharacterBuilder(
            avatar.Id,
            avatar.Level,
            skillSet
        ).build();
    }

    private getSkillSet(enkaSkills: SkillLevelEnka[]): SkillKit {
        let skillSet: SkillKit = {} as SkillKit;
        enkaSkills.map((skill) => {
            skillSet[skill.Index] = {
                level: skill.Level,
                SkillId: skill.Index,
                subSkills: [],
            };
        });
        return skillSet;
    }


    //development test
    public async loadAgentData(): Promise<EnkaData> {
        return fetch(`https://enka.network/api/zzz/uid/${this.agent_UID}`)
            .then(response => response.json())
            .then(data => {
                return data as EnkaData;
            })
            .catch(error => {
                console.error("Error fetching Enka data:", error);
                return {} as EnkaData;
            });
    }

}

class ServiceEnkaWengine {
    static json_enkadata_wengine: EnkaWEngineData = wengineEnkaData as EnkaWEngineData;

    public static load_engine(weapon: Weapon): WEngine {
        const wengine = new WEngine();
        const wengineDataObject: any = wengineLabelsData;
        if (weapon === undefined)
            return wengine;

        const wengineMetaData = this.json_enkadata_wengine[weapon.Id];
        wengine.id = weapon.Id.toString();
        wengine.name = wengineDataObject[weapon.Id].EN;
        wengine.lvl = weapon.Level;
        wengine.star = weapon.UpgradeLevel;
        wengine.rarity = ENKA_RARITY[wengineMetaData.Rarity as EnkaRarityKey];

        const weapon_coef_growth = 1 + 0.1568166666666667 * weapon.Level + 0.8922 * weapon.BreakLevel;
        wengine[AttributeID.ATK] = wengineMetaData.MainStat.PropertyValue * weapon_coef_growth;

        const second_stats_id = fixPropertyId(<AttrValues>wengineMetaData.SecondaryStat.PropertyId);
        wengine[second_stats_id] = wengineMetaData.SecondaryStat.PropertyValue / 100 * (1 + 0.3 * weapon.BreakLevel);

        return wengine;
    }
}

class ServiceDiscset {
    public static buildDiscSet(equippedList: EquippedEnka[]): DiscSet {
        const discSet = new DiscSet();
        const discs: Record<number, Disc> = {};

        for (const equip of equippedList) {
            const disc_set_id = Math.floor(equip.Equipment.Id / 100);
            if (disc_set_id in discSet.disc_sets_bonus) {
                discSet.disc_sets_bonus[disc_set_id]++;
            } else {
                discSet.disc_sets_bonus[disc_set_id] = 1;
            }

            discs[equip.Slot] = this.buildDisc(equip);
        }

        discSet.discs = discs;
        return discSet;
    }

    private static buildDisc(equip: EquippedEnka): Disc {
        const disc = new Disc();
        disc.lvl = equip.Equipment.Level;
        disc.pos = equip.Slot;
        const enkaRarity = Math.floor(equip.Equipment.Id / 10) % 10;
        disc.rarity = ENKA_RARITY[enkaRarity as EnkaRarityKey];
        disc.equipset_id = Math.floor(equip.Equipment.Id / 100);

        const mainProperty = equip.Equipment.MainPropertyList[0];

        const mainStat = new Stat();
        mainStat.id = <AttrValues>fixPropertyId(mainProperty.PropertyId);
        mainStat.value = mainProperty.PropertyValue + (mainProperty.PropertyValue * disc.lvl * rarityScale[enkaRarity as rarityScaleKeys]);

        if (!(Object.values(TRUNCATE_STATS).includes(mainStat.id))) {
            mainStat.value /= 100;
        }

        console.log(enkaRarity);
        disc.main_stats = mainStat;

        disc.substats = this.buildStats(equip.Equipment.RandomPropertyList);

        return disc;
    }

    private static buildStats(substats: PropertyEnka[]): Stat[] {
        const subStats: Stat[] = [];
        substats.forEach((stat) => {
            const subStat = new Stat();
            subStat.id = <AttrValues>fixPropertyId(stat.PropertyId);
            subStat.value = stat.PropertyValue * stat.PropertyLevel;

            if (!(Object.values(TRUNCATE_STATS).includes(subStat.id))) {
                subStat.value /= 100;
            }

            subStats.push(subStat);
        });
        return subStats;
    }


}

