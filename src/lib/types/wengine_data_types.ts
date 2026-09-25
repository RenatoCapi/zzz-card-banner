export interface WengineData {
    [id: string]: WengineType
}

export interface WengineType {
    name: string;
    id: string;
    rarity: number;
    weaponType: number;
    stats: { [key: string]: number };
    effect: Effect;
    imgUrl: string;
}

export interface Effect {
    name: string;
    desc: string[];
}
