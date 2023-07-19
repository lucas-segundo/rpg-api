import { mockClass } from 'domain/models/Class/mock'
import { ClassRepo } from '.'
import { mockBaseData } from '../BaseData/mock'
import { mockClassSkillRepo } from '../ClassSkillRepo/mock'

const classMocked = mockClass()
const baseDataMocked = mockBaseData()

export const mockClassRepo = (): ClassRepo => ({
  ...classMocked,
  ...baseDataMocked,
  classesSkills: [mockClassSkillRepo(), mockClassSkillRepo()],
})
