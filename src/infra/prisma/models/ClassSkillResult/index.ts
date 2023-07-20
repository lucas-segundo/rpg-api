import { ClassesSkills } from '@prisma/client'
import { PrismaClassResult } from '../ClassResult'
import { PrismaSkillResult } from '../SkillResult'

export interface PrismaClassSkillResult extends ClassesSkills {
  skill: PrismaSkillResult
  class: PrismaClassResult
}
