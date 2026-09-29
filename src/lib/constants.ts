export const AttributeID = {
    NONE: 0,
    HP: 11101,
    HP_P: 11102,
    HP_FLAT: 11103,

    SHIELD_P: 11302,
    SHIELD_FLAT: 11303,

    ATK: 12101,
    ATK_P: 12102,
    ATK_FLAT: 12103,

    IMPACT: 12201,
    IMPACT_P: 12202,

    SHEER_FORCE: 12301,
    SHEER_FORCE_FLAT: 12302,

    DEF: 13101,
    DEF_P: 13102,
    DEF_FLAT: 13103,

    CRIT_RATE: 20101,
    CRIT_RATE_FLAT: 20103,

    CRIT_DMG: 21101,
    CRIT_DMG_FLAT: 21103,

    PEN: 23101,
    PEN_P: 23103,
    PEN_FLAT: 23203,

    SHARP_CRIT_DMG: 21301,
    SHARP_CRIT_DMG_FLAT: 21303,

    ENERGY_RATE: 30501,
    ENERGY_P: 30502,
    ENERGY_REGEN_FLAT: 30503,

    ANOMALY_PROF: 31201,
    ANOMALY_PROF_FLAT: 31203,

    ANOMALY_MAST: 31401,
    ANOMALY_MAST_P: 31402,
    ANOMALY_MAST_FLAT: 31403,

    PHYS_DMG: 31501,
    PHYS_DMG_FLAT: 31503,

    FIRE_DMG: 31601,
    FIRE_DMG_FLAT: 31603,

    ICE_DMG: 31701,
    ICE_DMG_FLAT: 31703,

    ELEC_DMG: 31801,
    ELEC_DMG_FLAT: 31803,

    ETHER_DMG: 31901,
    ETHER_DMG_FLAT: 31903,

    WIND_DMG: 32301,
    WIND_DMG_FLAT: 32303,

    ADRENALINE_ACC: 32001,
    ADRENALINE_ACC_P: 32002,
    ADRENALINE_ACC_FLAT: 32003,

    SHEER_DMG_BONUS: 32201,
    SHEER_DMG_BONUS_FLAT: 32203,

    SHIELD_EFFECT: 99999,
} as const

export type AttrKeys = keyof typeof AttributeID
export type AttrValues = (typeof AttributeID)[AttrKeys]

export const Stats: AttrValues[] = Object.values(AttributeID)


export const StatsFloatNumber: AttrValues[] = [
    AttributeID.HP_P,
    AttributeID.SHIELD_P,
    AttributeID.ATK_P,
    AttributeID.IMPACT_P,
    AttributeID.DEF_P,
    AttributeID.CRIT_RATE,
    AttributeID.CRIT_RATE_FLAT,
    AttributeID.CRIT_DMG,
    AttributeID.CRIT_DMG_FLAT,
    AttributeID.SHARP_CRIT_DMG,
    AttributeID.SHARP_CRIT_DMG_FLAT,
    AttributeID.PEN,
    AttributeID.PEN_P,
    AttributeID.ENERGY_RATE,
    AttributeID.ENERGY_P,
    AttributeID.ANOMALY_MAST_P,
    AttributeID.PHYS_DMG,
    AttributeID.PHYS_DMG_FLAT,
    AttributeID.FIRE_DMG,
    AttributeID.FIRE_DMG_FLAT,
    AttributeID.ICE_DMG,
    AttributeID.ICE_DMG_FLAT,
    AttributeID.ELEC_DMG,
    AttributeID.ELEC_DMG_FLAT,
    AttributeID.ETHER_DMG,
    AttributeID.ETHER_DMG_FLAT,
    AttributeID.ADRENALINE_ACC_P,
    AttributeID.SHIELD_EFFECT,
]

export const DiscStats = [
    AttributeID.NONE,
    AttributeID.HP_P,
    AttributeID.HP_FLAT,
    AttributeID.ATK_P,
    AttributeID.ATK_FLAT,
    AttributeID.IMPACT_P,
    AttributeID.DEF_P,
    AttributeID.DEF_FLAT,
    AttributeID.CRIT_RATE_FLAT,
    AttributeID.CRIT_DMG_FLAT,
    AttributeID.PEN_P,
    AttributeID.PEN_FLAT,
    AttributeID.ENERGY_P,
    AttributeID.ANOMALY_PROF_FLAT,
    AttributeID.ANOMALY_MAST_P,
    AttributeID.PHYS_DMG_FLAT,
    AttributeID.FIRE_DMG_FLAT,
    AttributeID.ICE_DMG_FLAT,
    AttributeID.ELEC_DMG_FLAT,
    AttributeID.ETHER_DMG_FLAT,
    AttributeID.WIND_DMG_FLAT,
    AttributeID.SHIELD_EFFECT,
    AttributeID.SHIELD_P,
]

export type DiscStatsID = keyof typeof DiscStats

export const HOYO_MAP_SUB = {
    [AttributeID.HP_FLAT]: [AttributeID.HP],
    [AttributeID.ATK_FLAT]: [AttributeID.ATK],
    [AttributeID.DEF_FLAT]: [AttributeID.DEF],
    [AttributeID.CRIT_DMG_FLAT]: [AttributeID.CRIT_DMG],
    [AttributeID.CRIT_RATE_FLAT]: [AttributeID.CRIT_RATE],
    [AttributeID.PEN_P]: [AttributeID.PEN],
    [AttributeID.ANOMALY_PROF_FLAT]: [AttributeID.ANOMALY_PROF],
}

export const HOYO_DISC_SUB_RATE: { [id: number]: number } = {
    [AttributeID.HP]: 112,
    [AttributeID.HP_P]: 3,
    [AttributeID.ATK]: 19,
    [AttributeID.ATK_P]: 3,
    [AttributeID.DEF]: 15,
    [AttributeID.DEF_P]: 4.8,
    [AttributeID.CRIT_RATE]: 2.4,
    [AttributeID.CRIT_DMG]: 4.8,
    [AttributeID.PEN_FLAT]: 9,
    [AttributeID.ANOMALY_PROF]: 9,
}

export const StatsToReadableShort: { [id: number]: string } = {
    [AttributeID.HP]: "HP",
    [AttributeID.HP_P]: "HP %",
    [AttributeID.HP_FLAT]: "HP",
    [AttributeID.ATK]: "ATK",
    [AttributeID.ATK_P]: "ATK %",
    [AttributeID.ATK_FLAT]: "ATK",
    [AttributeID.IMPACT]: "IMP",
    [AttributeID.IMPACT_P]: "IMP %",
    [AttributeID.DEF]: "DEF",
    [AttributeID.DEF_P]: "DEF %",
    [AttributeID.DEF_FLAT]: "DEF",
    [AttributeID.CRIT_RATE]: "Crit Rate",
    [AttributeID.CRIT_RATE_FLAT]: "Crit Rate",
    [AttributeID.CRIT_DMG]: "Crit DMG",
    [AttributeID.CRIT_DMG_FLAT]: "Crit DMG",
    [AttributeID.PEN]: "PEN",
    [AttributeID.PEN_P]: "PEN %",
    [AttributeID.PEN_FLAT]: "PEN",
    [AttributeID.ENERGY_RATE]: "Energy Regen",
    [AttributeID.ENERGY_P]: "Energy %",
    [AttributeID.ANOMALY_PROF]: "AP",
    [AttributeID.ANOMALY_PROF_FLAT]: "AP",
    [AttributeID.ANOMALY_MAST]: "AM",
    [AttributeID.ANOMALY_MAST_P]: "AM %",
    [AttributeID.PHYS_DMG]: "Physical",
    [AttributeID.FIRE_DMG]: "Fire",
    [AttributeID.ICE_DMG]: "Ice",
    [AttributeID.ELEC_DMG]: "Electric",
    [AttributeID.ETHER_DMG]: "Ether",
    [AttributeID.WIND_DMG]: "Wind",
    [AttributeID.SHEER_FORCE]: "Sheer",
}


export const StatsToReadableMin: { [id: number]: string } = {
    [AttributeID.HP]: "HP",
    [AttributeID.HP_P]: "HP %",
    [AttributeID.HP_FLAT]: "HP",
    [AttributeID.ATK]: "ATK",
    [AttributeID.ATK_P]: "ATK %",
    [AttributeID.ATK_FLAT]: "ATK",
    [AttributeID.IMPACT]: "IMP",
    [AttributeID.IMPACT_P]: "IMP %",
    [AttributeID.DEF]: "DEF",
    [AttributeID.DEF_P]: "DEF %",
    [AttributeID.DEF_FLAT]: "DEF",
    [AttributeID.CRIT_RATE]: "CRIT",
    [AttributeID.CRIT_RATE_FLAT]: "CRIT",
    [AttributeID.CRIT_DMG]: "CDMG",
    [AttributeID.CRIT_DMG_FLAT]: "CDMG",
    [AttributeID.PEN]: "PEN",
    [AttributeID.PEN_P]: "PEN %",
    [AttributeID.PEN_FLAT]: "PEN",
    [AttributeID.ENERGY_RATE]: "ER",
    [AttributeID.ENERGY_P]: "ER %",
    [AttributeID.ANOMALY_PROF]: "AP",
    [AttributeID.ANOMALY_PROF_FLAT]: "AP",
    [AttributeID.ANOMALY_MAST]: "AM",
    [AttributeID.ANOMALY_MAST_P]: "AM %",
    [AttributeID.PHYS_DMG]: "PHYS",
    [AttributeID.FIRE_DMG]: "FIRE",
    [AttributeID.ICE_DMG]: "ICE",
    [AttributeID.ELEC_DMG]: "ELEC",
    [AttributeID.ETHER_DMG]: "ETHER",
    [AttributeID.WIND_DMG]: "WIND",
    [AttributeID.SHEER_FORCE]: "SHEER"
}

export const WeaponTypeID = {
    ATTACK: 1,
    STUN: 2,
    ANOMALY: 3,
    SUPPORT: 4,
    DEFENSE: 5,
    RUPTURE: 6,
    ARMORER: 7,
}

export const HitTypeID = {
    SLASH: 101,
    STRIKE: 102,
    PIERCE: 103,
}

export const ElementTypeID = {
    PHYSICAL: 200,
    FIRE: 201,
    ICE: 202,
    ELECTRIC: 203,
    WIND: 204,
    ETHER: 205,
    LUMEN: 300,
}

export const ElementTypeToAttr = {
    [ElementTypeID.PHYSICAL]: AttributeID.PHYS_DMG,
    [ElementTypeID.FIRE]: AttributeID.FIRE_DMG,
    [ElementTypeID.ICE]: AttributeID.ICE_DMG,
    [ElementTypeID.ELECTRIC]: AttributeID.ELEC_DMG,
    [ElementTypeID.ETHER]: AttributeID.ETHER_DMG,
    [ElementTypeID.WIND]: AttributeID.WIND_DMG,
    [ElementTypeID.LUMEN]: ElementTypeID.LUMEN,
}

export type ElementTypeToAttrKeys = keyof typeof ElementTypeToAttr


export const CampID = {
    CUNNING: 1,
    VICTORIA: 2,
    BELOBOG: 3,
    CALYDON: 4,
    OBOL: 5,
    HSOS6: 6,
    NEPS: 7,
    STARS: 8,
    MOCKINGBIRD: 9,
    YUNKUI: 10,
    SPOOK: 11,
    KRAMPUS: 12,
    ANGELS: 13,
    PHAETHON: 14,
    ROSCAELIFER: 15,
    COVENANT: 16,
    AIRSPACE: 17,
}

export const HOYO_SkillID = {
    BASIC: 0,
    SPECIAL: 1,
    DODGE: 2,
    CHAIN: 3,
    CORE: 5,
    ASSIST: 6,
}

export const SkillReadable = {
    [HOYO_SkillID.BASIC]: "basic",
    [HOYO_SkillID.SPECIAL]: "special",
    [HOYO_SkillID.DODGE]: "dodge",
    [HOYO_SkillID.CHAIN]: "chain",
    [HOYO_SkillID.CORE]: "core",
    [HOYO_SkillID.ASSIST]: "assist",
}

export const RarityID = {
    "B": 2,
    "A": 3,
    "S": 4,
}

export type RarityTypeID = keyof typeof RarityID

export const ATTACKS_KEYS = {
    BASIC: "Basic", // basic attack
    DASH: "Dash", // dash attack
    DODGE: "Dodge", // perfect dodge attack
    SPECIAL: "Special",
    EXSPECIAL: "EX Special",
    QUICK: "Quick", // quick assist
    DEFENSIVE: "Defensive", // defesive hit assist
    FOLLOW_UP: "Follow-Up", // follow-up defensive or evasive assist
    CHAIN: "Chain",
    ULTIMATE: "Ultimate",
}

export type SkillIDKey = keyof typeof HOYO_SkillID

