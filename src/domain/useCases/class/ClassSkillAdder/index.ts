import { Class } from 'domain/models/Class'

export interface ClassSkillAdderParams {
  classId: number
  skillId: number
}

export interface ClassSkillAdder {
  add(params: ClassSkillAdderParams): Promise<Class>
}
