import { Skill } from 'domain/models/Skill'

export interface SkillReaderParams {
  id: number
}

export interface SkillReader {
  read(params: SkillReaderParams): Promise<Skill | null>
}
