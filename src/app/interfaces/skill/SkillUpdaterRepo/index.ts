import { SkillRepo } from 'app/models/SkillRepo'
import {
  SkillUpdaterIdentifier,
  SkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater'

export interface SkillUpdaterRepoIdentifier extends SkillUpdaterIdentifier {}
export interface SkillUpdaterRepoParams extends SkillUpdaterParams {}

export interface SkillUpdaterRepo {
  update(
    identifier: SkillUpdaterRepoIdentifier,
    params: SkillUpdaterRepoParams
  ): Promise<SkillRepo>
}
