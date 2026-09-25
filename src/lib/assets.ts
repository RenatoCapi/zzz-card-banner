
import { Stat } from "./models/DiscSet";

import discset_data from "../data/base_discset_data.json";
//import wengine_data from "../data/base_wengine_data.json";
import wengine_data from "../data/game_data_wengine.json";
import { ICON_FROM_ELEMENT_MAPPING, ICON_FROM_SKILL_MAPPING, ICON_FROM_STAT_MAPPING } from "./constantsUI";
import { dataDiscSetsMeta as DataDiscSetsMeta } from "./types/discs_metadata";
import { WengineData } from "./types/wengine_data_types";

export class Assets {
    private static BASE_PATH = "/zzz-card-banner";

    private static getBlank() {
        return Assets.getImageUrl('/misc/blank.webp')
    }

    private static getImageUrl(name: string) {
        return new URL(this.BASE_PATH + `/assets${name}`, import.meta.url).href;
    }

    public static getEnkaLogo() {
        return Assets.getImageUrl('/misc/Enka_logo.png');
    }

    public static getStatIcon(stat: Stat) {
        return Assets.getImageUrl(`/icon/property/${ICON_FROM_STAT_MAPPING[stat.id]}`)
    }

    public static getCharacterAvatarById(id: number) {
        return Assets.getImageUrl(`/image/avatar_cinema/${id}.webp`)
    }

    public static getDiscSetById(id: number) {
        if (!id) return Assets.getBlank();

        const discs_meta: DataDiscSetsMeta = discset_data;
        return Assets.getImageUrl(`/icon/disc/${discs_meta[id]['icon']}`)
    }

    public static getRarity(id: number) {
        if (!id) return Assets.getBlank();
        return Assets.getImageUrl(`/icon/rarity/rarity${id}.webp`)
    }

    static getWeapon(id: number) {
        if (!id) return Assets.getBlank();

        return Assets.getImageUrl(`/icon/weaponType/IconWeapon${id}.webp`);
    }

    static getElement(elementid: number) {
        return Assets.getImageUrl(`/icon/property/${ICON_FROM_ELEMENT_MAPPING[+elementid]}`);
    }

    static getCamp(camp: number) {
        if (!camp) return Assets.getBlank();
        return Assets.getImageUrl(`/icon/camp/IconCamp${camp}.webp`);
    }

    static getWEngine(id: number) {
        if (!id) return Assets.getBlank();

        const wengine_meta: WengineData = wengine_data;
        return Assets.getImageUrl(`/icon/wengine/${wengine_meta[id]["imgUrl"]}`)
    }

    static getSkill(id: number) {
        return Assets.getImageUrl(`/icon/skill/${ICON_FROM_SKILL_MAPPING[id]}`)
    }

    static getTutorialAllChars() {
        return Assets.getImageUrl(`/misc/zzz_card_banner_scraper_instructions.webp`)
    }

    static getTutorialSingleChar() {
        return Assets.getImageUrl(`/misc/zzz_card_banner_instructions.webp`)
    }

    static getRole(id: number) {
        return Assets.getImageUrl(`/icon/role/${id}.webp`)
    }
}
