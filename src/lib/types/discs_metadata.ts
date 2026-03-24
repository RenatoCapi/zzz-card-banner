export interface dataDiscSetsMeta {
    [id: number]: DiscSetMeta
}

export interface DiscSetMeta {
    icon: string;
    EN: Language;
}

export interface Language {
    name: string;
}
