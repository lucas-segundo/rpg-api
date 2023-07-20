import { Skill } from 'domain/models/Skill'
import { SkillCreaterParams } from 'domain/useCases/skill/SkillCreater'

export interface SkillCreaterRepo {
  create(params: SkillCreaterParams): Promise<Skill>
}
