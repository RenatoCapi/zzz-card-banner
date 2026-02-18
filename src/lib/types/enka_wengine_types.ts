export interface EnkaWEngineData {
    [id: string]: EnkaWengine;
}

export interface EnkaWengine {
    ItemName: string;
    Rarity: number;
    ProfessionType: ProfessionType;
    ImagePath: string;
    MainStat: Stat;
    SecondaryStat: Stat;
}

export interface Stat {
    PropertyId: number;
    PropertyValue: number;
}

export enum ProfessionType {
    Anomaly = "Anomaly",
    Attack = "Attack",
    Defense = "Defense",
    Rupture = "Rupture",
    Stun = "Stun",
    Support = "Support",
}
