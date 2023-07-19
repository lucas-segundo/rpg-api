import { ClassRepo } from 'app/models/ClassRepo'
import { Class } from 'domain/models/Class'
import { Skill } from 'domain/models/Skill'

export abstract class DbClassModelAdapter {
  adapt({ id, title, classesSkills, deletedAt }: ClassRepo): Class {
    return {
      id,
      title,
      skills: this.adaptToSkill(classesSkills),
      deletedAt,
    }
  }

  adaptToSkill(classesSkills: ClassRepo['classesSkills']): Skill[] {
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
