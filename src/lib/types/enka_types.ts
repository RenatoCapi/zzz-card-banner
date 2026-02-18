import { AttrValues } from "../constants";

export interface EnkaData {
    PlayerInfo: PlayerInfo;
    uid: string;
    ttl: number;
    region: string;
}

export interface PlayerInfo {
    SocialDetail: SocialDetail;
    ShowcaseDetail: ShowcaseDetail;
}

export interface ShowcaseDetail {
    AvatarList: AvatarEnka[];
}

export interface AvatarEnka {
    EquippedList: EquippedEnka[];
    SkillLevelList: SkillLevelEnka[];
    ClaimedRewardList: number[];
    WeaponEffectState: number;
    TalentToggleList: boolean[];
    IsFavorite: boolean;
    IsUpgradeUnlocked: boolean;
    Id: number;
    Level: number;
    PromotionLevel: number;
    Exp: number;
    SkinId: number;
    UpgradeId: number;
    TalentLevel: number;
    WeaponUid: number;
    CoreSkillEnhancement: number;
    ObtainmentTimestamp: number;
    Weapon?: Weapon;
}

export interface EquippedEnka {
    Slot: number;
    Equipment: Equipment;
}

export interface Equipment {
    RandomPropertyList: PropertyEnka[];
    MainPropertyList: PropertyEnka[];
    IsAvailable: boolean;
    IsLocked: boolean;
    IsTrash: boolean;
    Id: number;
    Level: number;
    Uid: number;
    BreakLevel: number;
    Exp: number;
}

export interface PropertyEnka {
    PropertyId: AttrValues;
    PropertyValue: number;
    PropertyLevel: number;
}

export interface SkillLevelEnka {
    Level: number;
    Index: number;
}

export interface Weapon {
    IsAvailable: boolean;
    IsLocked: boolean;
    Id: number;
    Level: number;
    Uid: number;
    BreakLevel: number;
    Exp: number;
    UpgradeLevel: number;
}

export interface SocialDetail {
    MedalList: MedalList[];
    Desc: string;
    ProfileDetail: ProfileDetail;
}

export interface MedalList {
    Value: number;
    MedalScore: number;
    MedalIcon: number;
    MedalType: number;
}

export interface ProfileDetail {
    TitleInfo: TitleInfo;
    Nickname: string;
    AvatarId: number;
    Level: number;
    Uid: number;
    Title: number;
    ProfileId: number;
    PlatformType: number;
    CallingCardId: number;
}

export interface TitleInfo {
    Args: any[];
    Title: number;
    FullTitle: number;
}
