export interface DiscsetData {
    [id: string]: Discset
}

export interface Discset {
    id: string;
    icon: string;
    name: string;
    setProp2pc: { [key: string]: number };
    desc: string;
}
