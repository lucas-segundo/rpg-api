import { BaseData } from '../BaseData'
import { ClassSkillRepo } from '../ClassSkillRepo'

export interface ClassRepo extends BaseData {
  id: number
  title: string
  classesSkills: Omit<ClassSkillRepo, 'class'>[]
}
