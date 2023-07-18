import { Skill } from 'domain/models/Skill'

export interface SkillDeleterParams {
  id: number
}

export interface SkillDeleter {
  delete(params: SkillDeleterParams): Promise<Skill>
}
