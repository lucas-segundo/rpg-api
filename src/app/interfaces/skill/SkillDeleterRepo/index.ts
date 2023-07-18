import { SkillRepo } from 'app/models/SkillRepo'
import { SkillDeleterParams } from 'domain/useCases/skill/SkillDeleter'

export interface SkillDeleterRepoParams extends SkillDeleterParams {}

export interface SkillDeleterRepo {
  delete(params: SkillDeleterRepoParams): Promise<SkillRepo>
}
