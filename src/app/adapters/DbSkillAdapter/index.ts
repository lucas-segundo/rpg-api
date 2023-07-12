import { SkillRepo } from 'app/models/SkillRepo'
import { Skill } from 'domain/models/Skill'

export abstract class DbSkillModelAdapter {
  adapt({ id, title, deletedAt }: SkillRepo): Skill {
    return {
      id,
      title,
      deletedAt,
    }
  }
}
