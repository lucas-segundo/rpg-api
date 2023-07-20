import { Skill } from 'domain/models/Skill'
import { SkillReaderParams } from 'domain/useCases/skill/SkillReader'

export interface SkillReaderRepo {
  read(params: SkillReaderParams): Promise<Skill | null>
}
