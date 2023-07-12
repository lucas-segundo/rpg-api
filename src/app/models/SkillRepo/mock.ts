import { mockSkill } from 'domain/models/Skill/mock'
import { SkillRepo } from '.'
import { mockBaseData } from '../BaseData/mock'

const SkillMocked = mockSkill()
const baseDataMocked = mockBaseData()

export const mockSkillRepo = (): SkillRepo => ({
  ...SkillMocked,
  ...baseDataMocked,
})
