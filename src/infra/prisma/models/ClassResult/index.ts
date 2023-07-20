import { Class, ClassesSkills, Skill } from '@prisma/client'

interface ClassesSkillsResult extends ClassesSkills {
  skill: Skill
}

export interface PrismaClassResult extends Class {
  classesSkills: ClassesSkillsResult[]
}
