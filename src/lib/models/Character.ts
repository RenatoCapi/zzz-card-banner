import { AttributeID, AttrValues, WeaponTypeID } from "../constants";
import { BasicStatsObject } from "../types/basic_stats_object";
import { CharMetadata } from "./CharMetadata";
import { DiscSet } from "./DiscSet";
import { SkillKit } from "./SkillKit";
import { StatsBase } from "./StatsBase";
import { WEngine } from "./WEngine";

export class Character extends StatsBase {
    id: number = 0
    name: string = ""
    lvl: number = 60
    rank: number = 0
    charBase: BasicStatsObject = new StatsBase()
    charMetadata: CharMetadata = new CharMetadata()
    skillKit: SkillKit = {}
    wengine: WEngine = new WEngine()
    discSet: DiscSet = new DiscSet()

    public setCharBase(charBase: BasicStatsObject) {
        this.charBase = charBase;
    }

    public setWengine(wengine: WEngine) {
        this.wengine = wengine;
    }

    public setDiscSet(discSet: DiscSet) {
        discSet.sumDiscs();
        this.discSet = discSet;
    }

    public sumSecondaryStats(attrID: AttrValues) {
        if (attrID === AttributeID.NONE || attrID === AttributeID.SHIELD_EFFECT) return;
        this[attrID] = this.charBase[attrID] + this.wengine[attrID] + this.discSet.sumStats[attrID];
    }

    public sumMainStat(attrFlatId: AttrValues) {
        if (attrFlatId === AttributeID.NONE || attrFlatId === AttributeID.SHIELD_EFFECT || attrFlatId === AttributeID.SHEER) return;
        const attrPercId = <AttrValues>(attrFlatId + 1);
        const base = this.charBase[attrFlatId] + this.wengine[attrFlatId];
        const perc = this.charBase[attrPercId] + this.wengine[attrPercId] + this.discSet.sumStats[attrPercId];
        this[attrFlatId] = (base * (1 + perc / 100)) + this.discSet.sumStats[attrFlatId];
    }

    public sumSheerStat() {
        if (+this.charMetadata.weapon === WeaponTypeID.RUPTURE) {
            this[AttributeID.SHEER] = this[AttributeID.ATK] * 0.3 + this[AttributeID.HP] * 0.1;
        }
    }

    public calcAllStats() {
        this.sumMainStat(AttributeID.HP);
        this.sumMainStat(AttributeID.ATK);
        this.sumMainStat(AttributeID.IMPACT);
        this.sumMainStat(AttributeID.DEF);
        this.sumSecondaryStats(AttributeID.CRIT_RATE);
        this.sumSecondaryStats(AttributeID.CRIT_DMG);
        this.sumSecondaryStats(AttributeID.PEN);
        this.sumSecondaryStats(AttributeID.PEN_FLAT);
        this.sumMainStat(AttributeID.ENERGY_RATE);
        this.sumSecondaryStats(AttributeID.ANOMALY_PROF);
        this.sumMainStat(AttributeID.ANOMALY_MAST);
        this.sumSecondaryStats(AttributeID.PHYS_DMG);
        this.sumSecondaryStats(AttributeID.FIRE_DMG);
        this.sumSecondaryStats(AttributeID.ICE_DMG);
        this.sumSecondaryStats(AttributeID.ELEC_DMG);
        this.sumSecondaryStats(AttributeID.ETHER_DMG);
        this.sumSheerStat();
    }

    public print() {
        this.calcAllStats();
        console.log(JSON.stringify(this));
        console.log(JSON.stringify(this.discSet.disc_sets_bonus));
    }
}