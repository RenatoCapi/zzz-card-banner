
import { Stat } from "./models/DiscSet";

import { ElementTypeToAttr } from "./constants";

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
        const reduc_stat_id = ~~(stat.id / 100)
        return Assets.getImageUrl(`/icon/property/prop_${reduc_stat_id}.webp`)
    }

    public static getCharacterAvatarById(id: number) {
        return Assets.getImageUrl(`/image/avatar_cinema/${id}.webp`)
    }

    public static getDiscSetById(id: number) {
        if (!id) return Assets.getBlank();
        return Assets.getImageUrl(`/icon/disc/discset_${id}00.png`)
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
        // exceção no ID por causa de lumen
        const reduc_element_id: string = ElementTypeToAttr[elementid].toString().slice(0, 3)
        return Assets.getImageUrl(`/icon/property/prop_${reduc_element_id}.webp`);
    }

    static getCamp(camp: number) {
        if (!camp) return Assets.getBlank();
        return Assets.getImageUrl(`/icon/camp/IconCamp${camp}.webp`);
    }

    static getWEngine(id: number) {
        if (!id) return Assets.getBlank();
        return Assets.getImageUrl(`/icon/wengine/wengine_${id}.png`)
    }

    static getSkill(id: number) {
        return Assets.getImageUrl(`/icon/skill/skill_${id}.png`)
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