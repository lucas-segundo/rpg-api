import { Class } from 'domain/models/Class'
import { ClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder'

export interface ClassSkillAdderRepo {
  add(params: ClassSkillAdderParams): Promise<Class>
}
