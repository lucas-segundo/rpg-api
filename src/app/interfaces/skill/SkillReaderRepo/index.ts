import { SkillRepo } from 'app/models/SkillRepo'

export interface SkillReaderRepoParams {
  id: number
}

export interface SkillReaderRepo {
  read(params: SkillReaderRepoParams): Promise<SkillRepo | null>
}
