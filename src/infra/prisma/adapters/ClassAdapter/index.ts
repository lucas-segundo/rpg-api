import { Class } from 'domain/models/Class'
import { Skill } from 'domain/models/Skill'
import { PrismaClassResult } from 'infra/prisma/models/ClassResult'

export abstract class PrismaClassAdapter {
  adapt({ id, title, classesSkills, deletedAt }: PrismaClassResult): Class {
    return {
      id,
      title,
      skills: this.adaptToSkill(classesSkills),
      deletedAt,
    }
  }

  private adaptToSkill(
    classesSkills: PrismaClassResult['classesSkills']
  ): Skill[] {
    const skills = classesSkills.map(({ skill }): Skill => {
      const { id, title, deletedAt } = skill

      return {
        id,
        title,
        deletedAt,
      }
    })

    return skills
  }
}
