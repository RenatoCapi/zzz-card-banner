import { AttributeID, AttrValues, WeaponTypeID } from "../constants";
import { CharMetadata } from "./CharMetadata";
import { DiscSet } from "./DiscSet";
import { Skillkit } from './SkillKit';
import { createEmptyStatBaseObject, StatBaseType } from "./StatsBase";
import { WEngine } from "./WEngine";

export class Character {
    id: number = 0
    name: string = ""
    lvl: number = 60
    rank: number = 0
    charMetadata: CharMetadata = new CharMetadata()
    charBase: StatBaseType = createEmptyStatBaseObject()
    charSum: StatBaseType = createEmptyStatBaseObject()
    skillKit: Skillkit = new Skillkit({}, {})
    wengine: WEngine = new WEngine()
    discSet: DiscSet = new DiscSet()

    public setCharBase(charBase: StatBaseType) {
        this.charBase = charBase;
    }

    public setWengine(wengine: WEngine) {
        this.wengine = wengine;
    }

    public setDiscSet(discSet: DiscSet) {
        discSet.sumDiscs();
        this.discSet = discSet;
    }

    public sumSecondaryStats(attrId: AttrValues) {
        if (attrId === AttributeID.NONE || attrId === AttributeID.SHIELD_EFFECT) return;
        this.charSum[attrId] = this.charBase[attrId] + this.getWengineStat(attrId) + this.discSet.sumStats[attrId];
    }

    public sumMainStat(attrId: AttrValues) {
        const attrPercId = <AttrValues>(attrId + 1);
        const base = this.charBase[attrId] + this.getWengineStat(attrId);
        const perc = this.charBase[attrPercId] + this.getWengineStat(attrPercId) + this.discSet.sumStats[attrPercId];
        this.charSum[attrId] = (base * (1 + perc / 100)) + this.discSet.sumStats[attrId];
    }

    public sumSheerStat() {
        if (+this.charMetadata.weapon === WeaponTypeID.RUPTURE) {
            this.charSum[AttributeID.SHEER_FORCE] = Math.floor(this.charSum[AttributeID.ATK] * 0.3 + this.charSum[AttributeID.HP] * 0.1);
        }
    }

    public sumSharpCritRateStat() {
        if (+this.charMetadata.weapon === WeaponTypeID.ARMORER) {
            this.charSum[AttributeID.CRIT_RATE] += this.charSum[AttributeID.CRIT_DMG] * 0.35;
        }
    }

    public calcAllStats() {
        this.sumMainStat(AttributeID.HP);
        this.sumMainStat(AttributeID.ATK);
        this.sumMainStat(AttributeID.IMPACT);
        this.sumMainStat(AttributeID.DEF);
        this.sumSecondaryStats(AttributeID.CRIT_RATE);
        this.sumSecondaryStats(AttributeID.CRIT_DMG);
        this.sumSecondaryStats(AttributeID.SHARP_CRIT_DMG);
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
        this.sumSecondaryStats(AttributeID.WIND_DMG);
        this.sumSheerStat();
        this.sumSharpCritRateStat();
        console.log(this);
    }

    public print() {
        this.calcAllStats();
        console.log(JSON.stringify(this));
        console.log(JSON.stringify(this.discSet.disc_sets_bonus));
    }

    private getWengineStat(attrId: AttrValues) {
        return (attrId in this.wengine.stats) ? this.wengine.stats[attrId] : 0;
    }
}