export const AttributeID = {
    NONE: 0,
    HP: 11101,
    HP_P: 11102,
    HP_FLAT: 11103,
    ATK: 12101,
    ATK_P: 12102,
    ATK_FLAT: 12103,
    IMPACT: 12201,
    IMPACT_P: 12202,
    DEF: 13101,
    DEF_P: 13102,
    DEF_FLAT: 13103,
    CRIT_RATE: 20101,
    CRIT_RATE_SUB: 20103,
    CRIT_DMG: 21101,
    CRIT_DMG_SUB: 21103,
    PEN: 23101,
    PEN_P: 23103,
    PEN_FLAT: 23203,
    ENERGY_RATE: 30501,
    ENERGY_P: 30502,
    ANOMALY_PROF: 31201,
    ANOMALY_PROF_SUB: 31203,
    ANOMALY_MAST: 31401,
    ANOMALY_MAST_P: 31402,
    PHYS_DMG: 31503,
    FIRE_DMG: 31603,
    ICE_DMG: 31703,
    ELEC_DMG: 31803,
    ETHER_DMG: 31903,
    SHIELD_EFFECT: 99999,
} as const

export type AttrKeys = keyof typeof AttributeID
export type AttrValues = (typeof AttributeID)[AttrKeys]

export const Stats: AttrValues[] = [
    AttributeID.HP,
    AttributeID.HP_P,
    AttributeID.HP_FLAT,
    AttributeID.ATK,
    AttributeID.ATK_P,
    AttributeID.ATK_FLAT,
    AttributeID.IMPACT,
    AttributeID.IMPACT_P,
    AttributeID.DEF,
    AttributeID.DEF_P,
    AttributeID.DEF_FLAT,
    AttributeID.CRIT_RATE,
    AttributeID.CRIT_RATE_SUB,
    AttributeID.CRIT_DMG,
    AttributeID.CRIT_DMG_SUB,
    AttributeID.PEN,
    AttributeID.PEN_P,
    AttributeID.PEN_FLAT,
    AttributeID.ENERGY_RATE,
    AttributeID.ENERGY_P,
    AttributeID.ANOMALY_PROF,
    AttributeID.ANOMALY_PROF_SUB,
    AttributeID.ANOMALY_MAST,
    AttributeID.ANOMALY_MAST_P,
    AttributeID.PHYS_DMG,
    AttributeID.FIRE_DMG,
    AttributeID.ICE_DMG,
    AttributeID.ELEC_DMG,
    AttributeID.ETHER_DMG,
    AttributeID.SHIELD_EFFECT,
]

export const HOYO_MAP_SUB = {
    [AttributeID.HP_FLAT]: [AttributeID.HP],
    [AttributeID.ATK_FLAT]: [AttributeID.ATK],
    [AttributeID.DEF_FLAT]: [AttributeID.DEF],
    [AttributeID.CRIT_DMG_SUB]: [AttributeID.CRIT_DMG],
    [AttributeID.CRIT_RATE_SUB]: [AttributeID.CRIT_RATE],
    [AttributeID.PEN_P]: [AttributeID.PEN],
    [AttributeID.ANOMALY_PROF_SUB]: [AttributeID.ANOMALY_PROF],
}


export const DiscSetID = {
    WOODPECKER_ELECTRO: 31000,
    PUFFER_ELECTRO: 31100,
    SHOCKSTAR: 31200,
    FREEDOM_BLUE: 31300,
    HORMONE_PUNK: 31400,
    SOUL_ROCK: 31500,
    SWING_JAZZ: 31600,
    CHAOS_JAZZ: 31800,
    PROTO_PUNK: 31900,
    INFERNAL_METAL: 32200,
    CHAOTIC_METAL: 32300,
    THUNDER_METAL: 32400,
    POLAR_METAL: 32500,
    FANGED_METAL: 32600,
    BLADE_SONG: 32700,
    ASTRAL_VOICE: 32800,
    SHADOW_HARMONY: 32900,
    PHAETHONS_MELODY: 33000,
    YUNKUI: 33100,
    SUMMIT: 33200,
    DAWN_BLOOM: 33300,
    MOON_LIGHT: 33400,
    WATER_BALLAD: 33500,
    SHINING_ARIA: 33600,
}

export const HOYO_2P_DISCSET: { [id: number]: number[] } = {
    [DiscSetID.WOODPECKER_ELECTRO]: [AttributeID.CRIT_RATE, 8.0],
    [DiscSetID.PUFFER_ELECTRO]: [AttributeID.PEN, 8.0],
    [DiscSetID.SHOCKSTAR]: [AttributeID.IMPACT_P, 6.0],
    [DiscSetID.FREEDOM_BLUE]: [AttributeID.ANOMALY_PROF, 30.0],
    [DiscSetID.HORMONE_PUNK]: [AttributeID.ATK_P, 10.0],
    [DiscSetID.SOUL_ROCK]: [AttributeID.DEF_P, 16.0],
    [DiscSetID.SWING_JAZZ]: [AttributeID.ENERGY_P, 20.0],
    [DiscSetID.CHAOS_JAZZ]: [AttributeID.ANOMALY_PROF, 30.0],
    [DiscSetID.PROTO_PUNK]: [AttributeID.SHIELD_EFFECT, 15.0],
    [DiscSetID.INFERNAL_METAL]: [AttributeID.FIRE_DMG, 10.0],
    [DiscSetID.CHAOTIC_METAL]: [AttributeID.ETHER_DMG, 10.0],
    [DiscSetID.POLAR_METAL]: [AttributeID.ICE_DMG, 10.0],
    [DiscSetID.THUNDER_METAL]: [AttributeID.ELEC_DMG, 10.0],
    [DiscSetID.FANGED_METAL]: [AttributeID.PHYS_DMG, 10.0],
    [DiscSetID.ASTRAL_VOICE]: [AttributeID.ATK_P, 10.0],
    [DiscSetID.BLADE_SONG]: [AttributeID.CRIT_DMG, 16.0],
    [DiscSetID.SHADOW_HARMONY]: [AttributeID.ATK_P, 0.0],
    [DiscSetID.PHAETHONS_MELODY]: [AttributeID.ANOMALY_MAST, 8.0],
    [DiscSetID.YUNKUI]: [AttributeID.HP_P, 10.0],
    [DiscSetID.SUMMIT]: [AttributeID.NONE, 6.0],
    [DiscSetID.DAWN_BLOOM]: [AttributeID.NONE, 15.0],
    [DiscSetID.MOON_LIGHT]: [AttributeID.ENERGY_P, 20.0],
    [DiscSetID.WATER_BALLAD]: [AttributeID.PHYS_DMG, 10.0],
    [DiscSetID.SHINING_ARIA]: [AttributeID.ETHER_DMG, 10.0],

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
    [AttributeID.CRIT_RATE_SUB]: "Crit Rate",
    [AttributeID.CRIT_DMG]: "Crit DMG",
    [AttributeID.CRIT_DMG_SUB]: "Crit DMG",
    [AttributeID.PEN]: "PEN",
    [AttributeID.PEN_P]: "PEN %",
    [AttributeID.PEN_FLAT]: "PEN",
    [AttributeID.ENERGY_RATE]: "Energy Regen",
    [AttributeID.ENERGY_P]: "Energy %",
    [AttributeID.ANOMALY_PROF]: "AP",
    [AttributeID.ANOMALY_PROF_SUB]: "AP",
    [AttributeID.ANOMALY_MAST]: "AM",
    [AttributeID.ANOMALY_MAST_P]: "AM %",
    [AttributeID.PHYS_DMG]: "Physical",
    [AttributeID.FIRE_DMG]: "Fire",
    [AttributeID.ICE_DMG]: "Ice",
    [AttributeID.ELEC_DMG]: "Electric",
    [AttributeID.ETHER_DMG]: "Ether"
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
    [AttributeID.CRIT_RATE_SUB]: "CRIT",
    [AttributeID.CRIT_DMG]: "CDMG",
    [AttributeID.CRIT_DMG_SUB]: "CDMG",
    [AttributeID.PEN]: "PEN",
    [AttributeID.PEN_P]: "PEN %",
    [AttributeID.PEN_FLAT]: "PEN",
    [AttributeID.ENERGY_RATE]: "ER",
    [AttributeID.ENERGY_P]: "ER %",
    [AttributeID.ANOMALY_PROF]: "AP",
    [AttributeID.ANOMALY_PROF_SUB]: "AP",
    [AttributeID.ANOMALY_MAST]: "AM",
    [AttributeID.ANOMALY_MAST_P]: "AM %",
    [AttributeID.PHYS_DMG]: "PHYS",
    [AttributeID.FIRE_DMG]: "FIRE",
    [AttributeID.ICE_DMG]: "ICE",
    [AttributeID.ELEC_DMG]: "ELEC",
    [AttributeID.ETHER_DMG]: "ETHER"
}

export const WeaponTypeID = {
    ATTACK: 1,
    STUN: 2,
    ANOMALY: 3,
    SUPPORT: 4,
    DEFENSE: 5,
    RUPTURE: 6,
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
    ETHER: 205,
}

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
}

export const HOYO_SkillID = {
    BASIC: 0,
    SPECIAL: 1,
    DODGE: 2,
    CHAIN: 3,
    CORE: 5,
    ASSIST: 6,
}

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
