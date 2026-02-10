import { AttributeID } from "../constants";

export type BasicStatsObject = {
    [AttributeID.NONE]: number
    [AttributeID.HP]: number
    [AttributeID.HP_P]: number
    [AttributeID.HP_FLAT]: number
    [AttributeID.ATK]: number
    [AttributeID.ATK_P]: number
    [AttributeID.ATK_FLAT]: number
    [AttributeID.IMPACT]: number
    [AttributeID.IMPACT_P]: number
    [AttributeID.DEF]: number
    [AttributeID.DEF_P]: number
    [AttributeID.DEF_FLAT]: number
    [AttributeID.CRIT_RATE]: number
    [AttributeID.CRIT_RATE_SUB]: number
    [AttributeID.CRIT_DMG]: number
    [AttributeID.CRIT_DMG_SUB]: number
    [AttributeID.PEN]: number
    [AttributeID.PEN_P]: number
    [AttributeID.PEN_FLAT]: number
    [AttributeID.ENERGY_RATE]: number
    [AttributeID.ENERGY_P]: number
    [AttributeID.ANOMALY_PROF]: number
    [AttributeID.ANOMALY_PROF_SUB]: number
    [AttributeID.ANOMALY_MAST]: number
    [AttributeID.ANOMALY_MAST_P]: number
    [AttributeID.PHYS_DMG]: number
    [AttributeID.FIRE_DMG]: number
    [AttributeID.ICE_DMG]: number
    [AttributeID.ELEC_DMG]: number
    [AttributeID.ETHER_DMG]: number
    [AttributeID.SHEER]: number
    [AttributeID.SHIELD_EFFECT]: number
}

