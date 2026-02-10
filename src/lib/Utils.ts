import { AttributeID, AttrValues, Stats } from "./constants"
import { Stat } from "./models/DiscSet"


export const DECIMAL_STATS: AttrValues[] = [
    AttributeID.HP,
    AttributeID.HP_FLAT,
    AttributeID.ATK,
    AttributeID.ATK_FLAT,
    AttributeID.IMPACT,
    AttributeID.DEF,
    AttributeID.DEF_FLAT,
    AttributeID.PEN_FLAT,
    AttributeID.ANOMALY_PROF,
    AttributeID.ANOMALY_PROF_SUB,
    AttributeID.ANOMALY_MAST,
    AttributeID.SHEER,
]

export const FLAT_STATS: AttrValues[] = [
    ...DECIMAL_STATS,
    AttributeID.ENERGY_RATE,
]

// Round a number to a certain precision. Useful for js floats: precisionRound(16.1999999312682, 5) == 16.2
export const precisionRound = (num: number, precision = 5) => {
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor;
}

export const isFlat = (stat: Stat) => {
    if (Object.values(DECIMAL_STATS).includes(stat.id))
        return Math.floor(stat.value);

    if (stat.id === AttributeID.ENERGY_RATE)
        return truncate10ths(stat.value).toFixed(1);

    return truncate10ths(stat.value).toFixed(1) + "%";
}


export const truncate10ths = (value: number) => {
    return Math.floor(value * 10) / 10
}


export const readValue = (value: string) => {
    if (value.endsWith('%')) {
        return precisionRound(parseFloat(value.slice(0, value.length - 1)))
    }
    return precisionRound(parseFloat(value))
}

export const fixPropertyId = (propertyId: AttrValues) => {
    const PERC_PROP_ID = 2;

    if (propertyId % 10 === PERC_PROP_ID)
        return propertyId;

    //convertendo os IDs 12103 para 12101
    const newPropId: number = Math.floor(propertyId / 10) * 10 + 1;

    if (Object.values(Stats).includes(<AttrValues>newPropId))
        return <AttrValues>newPropId;

    return propertyId;
}
