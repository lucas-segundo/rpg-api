import { Skill } from 'domain/models/Skill'
import { SkillDeleterParams } from 'domain/useCases/skill/SkillDeleter'

export interface SkillDeleterRepo {
  delete(params: SkillDeleterParams): Promise<Skill>
}
