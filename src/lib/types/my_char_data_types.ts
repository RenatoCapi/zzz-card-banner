export interface DataCharMap {
    [index: string]: DataCharType
}

export interface DataCharType {
    name: string;
    camp: string;
    rarity: string;
    weaponType: string;
    ElementType: string;
    hitType: string[];
    id: string;
    growthStat: { [key: string]: DataGrowthStat };
    staticStats: { [key: string]: number };
    skillKit: { [key: string]: DataSkill };
    hitMap: { [key: string]: DataSimpleHit };
    coreSkill: DataCoreSkill;
}

export interface DataCoreSkill {
    desc: string[];
    coreGrowthStat: { [key: string]: number };
}

export interface DataGrowthStat {
    base: number;
    growth: number;
    asc: number;
}

export interface DataSimpleHit {
    anomalyBuildup: number;
    miasmaDepletion: number;
    dmg: DataMultiplier;
    daze: DataMultiplier;
}


export interface DataSkill {
    skillId: number;
    desc: string[];
    subSkills: DataSubSkills;
}

export interface DataSubSkills {
    [key: string]: { [key: string]: DataComplexHit }
}

export interface DataComplexHit {
    hitID: string[];
    dmg: DataMultiplier;
    daze: DataMultiplier;
    formula?: string;
}

export interface DataMultiplier {
    base: number;
    growth: number;
}