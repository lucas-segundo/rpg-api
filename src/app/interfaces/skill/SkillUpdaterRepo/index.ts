import { Skill } from 'domain/models/Skill'
import {
  SkillUpdaterIdentifier,
  SkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater'

export interface SkillUpdaterRepo {
  update(
    identifier: SkillUpdaterIdentifier,
    params: SkillUpdaterParams
  ): Promise<Skill>
}
