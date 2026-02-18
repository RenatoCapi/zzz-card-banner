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

    ADRENALINE_ACC: 32001,
    ADRENALINE_ACC_P: 32002,
    ADRENALINE_ACC_FLAT: 32003,

    SHEER_DMG_BONUS: 32201,
    SHEER_DMG_BONUS_FLAT: 32203,

    SHIELD_EFFECT: 99999,
} as const

export type AttrKeys = keyof typeof AttributeID
export type AttrValues = (typeof AttributeID)[AttrKeys]

export const Stats: AttrValues[] = [
    AttributeID.NONE,
    AttributeID.HP,
    AttributeID.HP_P,
    AttributeID.HP_FLAT,
    AttributeID.ATK,
    AttributeID.ATK_P,
    AttributeID.ATK_FLAT,
    AttributeID.IMPACT,
    AttributeID.IMPACT_P,
    AttributeID.SHEER_FORCE,
    AttributeID.SHEER_FORCE_FLAT,
    AttributeID.DEF,
    AttributeID.DEF_P,
    AttributeID.DEF_FLAT,
    AttributeID.CRIT_RATE,
    AttributeID.CRIT_RATE_FLAT,
    AttributeID.CRIT_DMG,
    AttributeID.CRIT_DMG_FLAT,
    AttributeID.PEN,
    AttributeID.PEN_P,
    AttributeID.PEN_FLAT,
    AttributeID.ENERGY_RATE,
    AttributeID.ENERGY_P,
    AttributeID.ANOMALY_PROF,
    AttributeID.ANOMALY_PROF_FLAT,
    AttributeID.ANOMALY_MAST,
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
    AttributeID.ADRENALINE_ACC,
    AttributeID.ADRENALINE_ACC_P,
    AttributeID.ADRENALINE_ACC_FLAT,
    AttributeID.SHEER_DMG_BONUS,
    AttributeID.SHEER_DMG_BONUS_FLAT,
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
    AttributeID.SHIELD_EFFECT,
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


export const DiscSetID = {
    WOODPECKER_ELECTRO: 310,
    PUFFER_ELECTRO: 311,
    SHOCKSTAR: 312,
    FREEDOM_BLUE: 313,
    HORMONE_PUNK: 314,
    SOUL_ROCK: 315,
    SWING_JAZZ: 316,
    CHAOS_JAZZ: 318,
    PROTO_PUNK: 319,
    INFERNAL_METAL: 322,
    CHAOTIC_METAL: 323,
    THUNDER_METAL: 324,
    POLAR_METAL: 325,
    FANGED_METAL: 326,
    BLADE_SONG: 327,
    ASTRAL_VOICE: 328,
    SHADOW_HARMONY: 329,
    PHAETHONS_MELODY: 330,
    YUNKUI: 331,
    SUMMIT: 332,
    DAWN_BLOOM: 333,
    MOON_LIGHT: 334,
    WATER_BALLAD: 335,
    SHINING_ARIA: 336,
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
    [AttributeID.SHEER_FORCE]: "SHEER"
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

export const ENKA_RARITY = {
    2: "B",
    3: "A",
    4: "S",
}

export type EnkaRarityKey = keyof typeof ENKA_RARITY

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
