import { Skill } from 'domain/models/Skill'

export interface SkillCreaterParams {
  title: string
}

export interface SkillCreater {
  create(params: SkillCreaterParams): Promise<Skill>
}
