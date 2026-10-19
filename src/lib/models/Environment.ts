import { AttrValues, ElementTypeToAttr, WeaponTypeID } from '../constants';
import { AttributeID } from './../constants';
import { Character } from './Character';
import { CalculatedHit } from './SkillKit';

type RotationType = ({ charName: string } & CalculatedHit)

export class Environment {
    rotationList: (RotationType)[] = [];
    teammates: { [charName: string]: Character } = {};
    dps = 0.0;

    addHitDmg(param: string[]): number {
        const [charid, skillID, subSkillID, complexHitID] = param;
        const char = this.teammates[charid];

        if (!char) return 0;
        const calcHit = char.skillKit.calculatedHits[skillID][subSkillID][complexHitID];
        this.rotationList.push({
            charName: charid,
            ...calcHit
        });

        console.log(this.rotationList);
        return calcHit.dmg;
    }

    calcAllRotation() {
        this.dps = 0;
        this.rotationList.forEach(({ charName, dmg, anomalyBuildup }) => {
            const char: Character = this.teammates[charName];
            const charSum = char.charSum;
            let mainStats;

            if (char.charMetadata.weapon === WeaponTypeID.RUPTURE) {
                mainStats = AttributeID.SHEER_FORCE;
            } else {
                mainStats = AttributeID.ATK;
            }

            const elementId = <AttrValues>ElementTypeToAttr[char.charMetadata.elementId];
            const elementDmgMult = (anomalyBuildup) ? (1 + charSum[elementId] / 100) : 1;
            //const elementDmgMult = 1 + char[elementId] / 100;
            this.dps +=
                char.charSum[mainStats] *
                dmg / 100 *
                (1 + charSum[AttributeID.CRIT_RATE] / 100 * charSum[AttributeID.CRIT_DMG] / 100) *
                elementDmgMult;

            const resultString = `main_stats (${charSum[mainStats]}) * skill_dmg% (${dmg} / 100) *` +
                ` crit_avg ((1 + (${charSum[AttributeID.CRIT_RATE]}% * ${charSum[AttributeID.CRIT_DMG]}%)))` +
                ` * anomalyDmg% (${elementDmgMult})`;

            console.log(resultString);
        });

        return this.dps;
    }
}