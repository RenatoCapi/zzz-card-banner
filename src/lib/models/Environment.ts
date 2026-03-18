import { ElementTypeToAttr, WeaponTypeID } from '../constants';
import { AttributeID } from './../constants';
import { Character } from './Character';
import { CalculatedHit } from './SkillKit';

export class Environment {
    mainDPS: Character = new Character();
    rotationList: CalculatedHit[] = [];
    dps = 0.0;
    teammates: Character[] = [];

    addHit(param: string[]) {
        const [skillID, subSkillID, complexHitID] = param;
        this.rotationList.push(
            this.mainDPS.skillKit.calculatedHits[skillID][subSkillID][complexHitID]
        )
    }

    calcRotation() {
        let mainStats;
        if (this.mainDPS.charMetadata.weapon === WeaponTypeID.RUPTURE) {
            mainStats = AttributeID.SHEER_FORCE;
        } else {
            mainStats = AttributeID.ATK;
        }
        const elementId = ElementTypeToAttr[this.mainDPS.charMetadata.elementId];
        const skillMult = this.rotationList.reduce((acc, value) => acc + value.dmg, 0);

        //TODO other calc layers
        console.log(this.mainDPS);
        this.dps =
            this.mainDPS[mainStats] *
            skillMult / 100 *
            (1 + this.mainDPS[AttributeID.CRIT_RATE] / 100 * this.mainDPS[AttributeID.CRIT_DMG] / 100) *
            (1 + this.mainDPS[elementId] / 100);

        return this.dps;
    }
}