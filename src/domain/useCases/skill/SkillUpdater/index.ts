import { Skill } from 'domain/models/Skill'

export interface SkillUpdaterParams extends Partial<Omit<Skill, 'id'>> {}

export interface SkillUpdaterIdentifier {
  id: number
}

export interface SkillUpdater {
  update(
    identifier: SkillUpdaterIdentifier,
    params: SkillUpdaterParams
  ): Promise<Skill>
}
