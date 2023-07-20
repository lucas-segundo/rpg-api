import { SkillCreaterRepo } from 'app/interfaces/skill/SkillCreaterRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillCreater,
  SkillCreaterParams,
} from 'domain/useCases/skill/SkillCreater'

export class DbSkillCreater implements SkillCreater {
  constructor(private readonly skillCreaterRepo: SkillCreaterRepo) {}

  async create(params: SkillCreaterParams): Promise<Skill> {
    try {
      const data = await this.skillCreaterRepo.create(params)

      return data
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
