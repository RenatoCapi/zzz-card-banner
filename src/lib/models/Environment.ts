import { ElementTypeToAttr, WeaponTypeID } from '../constants';
import { AttributeID } from './../constants';
import { Character } from './Character';
import { CalculatedHit } from './SkillKit';

export class Environment {
    mainDPS: Character = new Character()
    rotationList: CalculatedHit[] = []
    dps = 0.0
    //teammates:Character[]

    addHit(skillID: string, subSkillID: string, complexHitID: string) {
        this.rotationList.push(
            this.mainDPS.skillKit.calculatedHits[skillID][subSkillID][complexHitID]
        )
    }

    calcRotation() {
        let mainStats;
        if (this.mainDPS.charMetadata.weapon === WeaponTypeID.RUPTURE.toString()) {
            mainStats = AttributeID.SHEER_FORCE;
        } else {
            mainStats = AttributeID.ATK;
        }
        const elementId = ElementTypeToAttr[+this.mainDPS.charMetadata.elementId];
        const skillMult = this.rotationList.reduce((acc, value) => acc + value.dmg, 0);

        //TODO other calc layers
        this.dps = this.mainDPS[mainStats] * skillMult * (1 + this.mainDPS[AttributeID.CRIT_RATE] * this.mainDPS[AttributeID.CRIT_DMG]) * (1 + this.mainDPS[elementId])
    }
}