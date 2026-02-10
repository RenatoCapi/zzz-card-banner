import { AttributeID, AttrValues } from '../constants'
import { Character } from '../models/Character'
import { Disc, DiscSet, Stat } from '../models/DiscSet'
import { SkillKit } from '../models/SkillKit'
import { WEngine } from '../models/WEngine'
import { Avatar, Equip, HoyolabData, Property, Skill, Suit, Weapon } from '../types/hoyolab_types'
import { fixPropertyId, readValue } from '../Utils'
import { CharacterBuilder } from './hakushin_parser'


export class ServiceHoyolab {
    json_hoyo: HoyolabData | undefined
    constructor(json: HoyolabData | undefined) {
        this.json_hoyo = json;
    }

    public buildCharacter() {
        if (this.json_hoyo === undefined)
            return new Character();

        const avatar: Avatar = this.json_hoyo.data.avatar_list[0];
        const serviceWengide = new ServiceWengine(avatar.weapon);
        const servicoDiscset: ServiceDiscset = new ServiceDiscset(avatar.equip);

        const character: Character = this.getCharacterBaseData(avatar);
        character.setWengine(serviceWengide.load_engine());
        character.setDiscSet(servicoDiscset.buildDiscSet());
        character.rank = avatar.rank;
        character.id = avatar.id;
        character.name = avatar.name_mi18n;
        character.calcAllStats();
        return character;
    }

    private getCharacterBaseData(avatar: Avatar) {
        const name_code = avatar.name_mi18n;
        const lvl = avatar.level;
        const skillSet = this.getSkillSet(avatar.skills);

        return new CharacterBuilder(
            name_code,
            lvl,
            skillSet
        ).build();
    }

    private getSkillSet(skills: Skill[]) {
        let skillSet: SkillKit = {};
        skills.map((skill) => {
            skillSet[skill.skill_type] = {
                level: skill.level,
                SkillId: skill.skill_type,
                subSkills: [],
            };
        });
        return skillSet;
    }
}

export class ServiceWengine {
    json_wengine: Weapon | undefined | null;
    constructor(json: Weapon | undefined | null) {
        this.json_wengine = json;
    }

    public load_engine() {
        const wengine = new WEngine();
        if (this.json_wengine === undefined || this.json_wengine === null)
            return wengine;

        wengine.id = String(this.json_wengine.id);
        wengine.name = this.json_wengine.name;
        wengine.lvl = this.json_wengine.level;
        wengine.star = this.json_wengine.star;
        wengine.rarity = this.json_wengine.rarity;

        wengine[AttributeID.ATK] = +this.json_wengine.main_properties[0].base;
        const second_stats = this.json_wengine.properties[0];
        const attrId = fixPropertyId(second_stats.property_id);
        wengine[attrId] = readValue(second_stats.base);

        return wengine;
    }
}

export class ServiceDiscset {
    json_equip: Equip[] | undefined;

    constructor(json: Equip[] | undefined) {
        this.json_equip = json;
    }

    public buildDiscSet() {
        if (this.json_equip === undefined)
            return new DiscSet();

        const discSet: DiscSet = new DiscSet();
        const equips: Equip[] = this.json_equip;
        const discs: Record<number, Disc> = {};

        for (const equip of equips) {
            const suit: Suit = equip.equip_suit;
            if (suit.own > 1)
                discSet.disc_sets_bonus[suit.suit_id] = suit.own;

            discs[equip.equipment_type] = this.buildDisc(equip);
        }
        discSet.discs = discs;
        return discSet;
    }

    private buildDisc(equip: Equip) {
        const disc: Disc = new Disc();
        disc.lvl = equip.level;
        disc.pos = equip.equipment_type;
        disc.rarity = equip.rarity;
        disc.equipset_id = equip.equip_suit.suit_id;

        const main_stats: Stat = new Stat();
        main_stats.id = <AttrValues>fixPropertyId(equip.main_properties[0].property_id);
        main_stats.value = readValue(equip.main_properties[0].base);

        disc.main_stats = main_stats;
        disc.substats = this.buildSubStats(equip.properties);
        return disc;

    }

    private buildSubStats(properties: Property[]) {
        const substats: Stat[] = [];
        for (const prop of properties) {
            const stat: Stat = new Stat();
            stat.id = <AttrValues>fixPropertyId(prop.property_id);
            stat.value = readValue(prop.base);
            substats.push(stat);
        }

        return substats;
    }


}
