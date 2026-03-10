import { WeaponTypeID } from '../constants';
import { DataComplexHit } from '../types/my_char_data_types';
import { AttributeID } from './../constants';
import { Character } from './Character';
import { SkillKit } from './SkillKit';

export class Environment {
    mainDPS: Character
    rotationList: DataComplexHit[] = []
    //teammates:Character[]

    constructor(mainDPS: Character) {
        this.mainDPS = mainDPS
    }

    addHit(skillID: string, subSkillID: string, complexHitID: string) {
        this.rotationList.push(
            this.mainDPS.skillKit[skillID].data.subSkills[subSkillID][complexHitID]
        )
    }

    calcRotation() {
        let mainStats;
        if (this.mainDPS.charMetadata.weapon === WeaponTypeID.RUPTURE.toString()) {
            mainStats = AttributeID.SHEER_FORCE
        } else {
            mainStats = AttributeID.ATK
        }
        const dmg = this.rotationList.reduce((acc, value) => acc + SkillKit.calcMultPerLvl(value.), 0);

    }
}