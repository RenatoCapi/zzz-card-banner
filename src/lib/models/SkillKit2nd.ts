import { DataSkill } from "../types/my_char_data_types"

export interface MySkillKit {
    [id: string]: Skill
}

export type Skill = {
    level: number,
    SkillId: number,
    data: DataSkill
}


