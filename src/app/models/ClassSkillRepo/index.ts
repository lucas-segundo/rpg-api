import { Class } from 'domain/models/Class'
import { Skill } from 'domain/models/Skill'
import { BaseData } from '../BaseData'

export interface ClassSkillRepo extends BaseData {
  class: Class
  classId: number
  skill: Skill
  skillId: number
}
