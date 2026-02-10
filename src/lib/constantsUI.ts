import { AttributeID, CampID, ElementTypeID, HOYO_SkillID, WeaponTypeID } from "./constants"

export const ICON_FROM_STAT_MAPPING: { [id: number]: string } = {
    [AttributeID.HP]: "prop-hp-icon.png",
    [AttributeID.HP_P]: "prop-hp-icon.png",
    [AttributeID.HP_FLAT]: "prop-hp-icon.png",
    [AttributeID.ATK]: "prop-atk-icon.png",
    [AttributeID.ATK_P]: "prop-atk-icon.png",
    [AttributeID.ATK_FLAT]: "prop-atk-icon.png",
    [AttributeID.IMPACT]: "prop-impact-icon.png",
    [AttributeID.IMPACT_P]: "prop-impact-icon.png",
    [AttributeID.DEF]: "prop-def-icon.png",
    [AttributeID.DEF_P]: "prop-def-icon.png",
    [AttributeID.DEF_FLAT]: "prop-def-icon.png",
    [AttributeID.CRIT_RATE]: "prop-crit-rate-icon.png",
    [AttributeID.CRIT_RATE_SUB]: "prop-crit-rate-icon.png",
    [AttributeID.CRIT_DMG]: "prop-crit-dmg-icon.png",
    [AttributeID.CRIT_DMG_SUB]: "prop-crit-dmg-icon.png",
    [AttributeID.PEN]: "prop-pen-ratio-icon.png",
    [AttributeID.PEN_P]: "prop-pen-value-icon.png",
    [AttributeID.PEN_FLAT]: "prop-pen-ratio-icon.png",
    [AttributeID.ENERGY_RATE]: "prop-energy-regen-icon.png",
    [AttributeID.ENERGY_P]: "prop-energy-regen-icon.png",
    [AttributeID.ANOMALY_PROF]: "prop-anomaly-proficiency-icon.png",
    [AttributeID.ANOMALY_PROF_SUB]: "prop-anomaly-proficiency-icon.png",
    [AttributeID.ANOMALY_MAST]: "prop-anomaly-mastery-icon.png",
    [AttributeID.ANOMALY_MAST_P]: "prop-anomaly-mastery-icon.png",
    [AttributeID.PHYS_DMG]: "IconPhysical.webp",
    [AttributeID.FIRE_DMG]: "IconFire.webp",
    [AttributeID.ICE_DMG]: "IconIce.webp",
    [AttributeID.ELEC_DMG]: "IconElectric.webp",
    [AttributeID.ETHER_DMG]: "IconEther.webp",
}

export const ICON_FROM_WEAPON_MAPPING: { [id: number]: string } = {
    [WeaponTypeID.ATTACK]: "IconAttack.webp",
    [WeaponTypeID.STUN]: "IconStun.webp",
    [WeaponTypeID.ANOMALY]: "IconAnomaly.webp",
    [WeaponTypeID.SUPPORT]: "IconSupport.webp",
    [WeaponTypeID.DEFENSE]: "IconDefense.webp",
    [WeaponTypeID.RUPTURE]: "IconRupture.webp",
}

export const ICON_FROM_ELEMENT_MAPPING: { [id: number]: string } = {
    [ElementTypeID.PHYSICAL]: "IconPhysical.webp",
    [ElementTypeID.FIRE]: "IconFire.webp",
    [ElementTypeID.ICE]: "IconIce.webp",
    [ElementTypeID.ELECTRIC]: "IconElectric.webp",
    [ElementTypeID.ETHER]: "IconEther.webp",
}

export const ICON_FROM_CAMP_MAPPING: { [id: number]: string } = {
    [CampID.CUNNING]: "IconCunning.webp",
    [CampID.VICTORIA]: "IconVictoria.webp",
    [CampID.BELOBOG]: "IconBelobog.webp",
    [CampID.CALYDON]: "IconCalydon.webp",
    [CampID.OBOL]: "IconOBOL.webp",
    [CampID.HSOS6]: "IconHSOS6.webp",
    [CampID.NEPS]: "IconNEPS.webp",
    [CampID.STARS]: "IconStarsOfLyra.webp",
    [CampID.YUNKUI]: "IconYunkui.webp",
    [CampID.SPOOK]: "IconSpook.webp",
    [CampID.KRAMPUS]: "IconKrampus.webp",
    [CampID.MOCKINGBIRD]: "IconMockingbird.webp",
    [CampID.ANGELS]: "IconAngels.webp",
}

export const ICON_FROM_SKILL_MAPPING: { [id: number]: string } = {
    [HOYO_SkillID.CORE]: "core.png",
    [HOYO_SkillID.BASIC]: "basic.png",
    [HOYO_SkillID.DODGE]: "dodge.png",
    [HOYO_SkillID.ASSIST]: "assist.png",
    [HOYO_SkillID.SPECIAL]: "special.png",
    [HOYO_SkillID.CHAIN]: "chain.png",
}

export const circle = "M40,0A40,40,0,1,0,80,40,40,40,0,0,0,40,0Zm0,71.91A31.91,31.91,0,1,1,71.91,40,32,32,0,0,1,40,71.91Z"

export const MOVIE_MAPPING: { [id: number]: string } = {
    1: "M30,27.28l-1.72,7.87H34L29.12,57.31h15l7.56-34.62H40.19Q37,26.68,30,27.28Z",
    2: "M51.92,22.69H36.82q-9.18,0-10.61,6.49L25,34.72H40l.5-2.07c.36-1.45,1.08-2.17,2.16-2.17a1.33,1.33,0,0,1,1.31.65,4.82,4.82,0,0,1,.09.65,4,4,0,0,1-2,3.76L21.68,50.08l-1.59,7.23H53.57l1.69-7.79H42.57L54.71,41a9.56,9.56,0,0,0,3.8-6.19l1.19-5.63a6.88,6.88,0,0,0,.2-1.94Q59.56,22.7,51.92,22.69Z",
    3: "M51.29,22.69h-15q-9.18,0-10.54,6.45l-.87,4.11H39.77l.28-1c.39-1.33,1.09-1.94,2.11-1.82.66.09,1.05.3,1.17.65a1.74,1.74,0,0,1,.23.73,4.27,4.27,0,0,1,0,.83c-.35,1.52-1.43,2.29-3.23,2.29H37.34l-1.69,7.79h3.24c1.26,0,1.93.47,2,1.41a3.71,3.71,0,0,1-.1.91l-.48,2.06C40,48.77,39.18,49.58,38,49.52c-.77,0-1.19-.52-1.27-1.46a4,4,0,0,1,0-.9L37.3,45h-15L21,51a6.51,6.51,0,0,0-.16,2q.33,4.37,7.89,4.37h15q9.18,0,10.72-7.28l.7-3.29a13.56,13.56,0,0,0,.37-3.43,5.45,5.45,0,0,0-.58-1.94q-.82-1.74-4-2.47,6.3-1.73,7.41-6.83L59,29.13a6.28,6.28,0,0,0,.18-1.86Q58.84,22.7,51.29,22.69Z",
    4: "M57.26,22.69H34.81L20.14,43.37l-1.56,7.1h17.6l-1.51,6.84h15l1.51-6.84h5l1.75-7.87h-5ZM37.86,42.6H33.29L40,33Z",
    5: "M23,42.94H38.11c.59-1.09,1.3-1.64,2.12-1.64a1.53,1.53,0,0,1,1.27.52,13.89,13.89,0,0,1,0,1.9L40.78,47c-.38,1.73-1.16,2.57-2.34,2.51-.92,0-1.34-.55-1.28-1.56.08-.43.15-.84.2-1.23s.11-.76.18-1.11H22.47L21.26,50.9a6.49,6.49,0,0,0-.17,1.91q.35,4.5,8,4.5H44.21Q53.48,57.31,55,50l2-9.3a9.25,9.25,0,0,0,.26-2.64q-.41-5.28-8.32-5.28a25.37,25.37,0,0,0-9.13,1.87l.91-4.16H59.25L61,22.69H27.41Z",
    6: "M51.29,22.69h-15q-9.13,0-10.54,6.45L21,51a7.15,7.15,0,0,0-.17,1.9q.35,4.45,7.9,4.46h15q9.21,0,10.76-7.27L56,43a9.1,9.1,0,0,0,.26-2.68q-.41-5.12-8.23-5.11a23.11,23.11,0,0,0-9.1,1.86l.86-3.82a6.46,6.46,0,0,1,.82-2.15,2,2,0,0,1,1.46-.65,1.29,1.29,0,0,1,1.25.64,1.08,1.08,0,0,1,.26.64,2.81,2.81,0,0,1-.12.81l-.09.59H58.11l.91-4a6.28,6.28,0,0,0,.18-1.86Q58.84,22.69,51.29,22.69Zm-11.9,20.6a1.4,1.4,0,0,1,1.27.56.91.91,0,0,1,.15.52,4,4,0,0,1-.13,1.17l-.39,1.77A2.75,2.75,0,0,1,39.47,49a2.12,2.12,0,0,1-1.47.56A1.24,1.24,0,0,1,36.8,49a3,3,0,0,1-.16-.7,4,4,0,0,1,.11-.95l.36-1.69C37.43,44.07,38.19,43.29,39.39,43.29Z"
}

export type MovieSvgKey = 0 | 1 | 2 | 3 | 4 | 5 | 6