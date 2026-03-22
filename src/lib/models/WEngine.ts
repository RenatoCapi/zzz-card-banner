import { AttrValues } from './../constants';

export type WengineStatsType = {
    [statId in AttrValues]: number;
};

export class WEngine {
    id: number = 0
    lvl: number = -1
    name: string = ""
    star: number = 0
    rarity: number = 0
    stats: WengineStatsType = {} as WengineStatsType
}