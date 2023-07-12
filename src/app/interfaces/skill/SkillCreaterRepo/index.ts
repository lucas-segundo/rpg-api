import { SkillRepo } from 'app/models/SkillRepo'

export interface SkillCreaterRepoParams {
  title: string
}

export interface SkillCreaterRepo {
  create(params: SkillCreaterRepoParams): Promise<SkillRepo>
}
