import { SkillCreaterRepo } from 'app/interfaces/skill/SkillCreaterRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillCreater,
  SkillCreaterParams,
} from 'domain/useCases/skill/SkillCreater'
import { DbSkillModelAdapter } from '../../../adapters/DbSkillAdapter'

export class DbSkillCreater
  extends DbSkillModelAdapter
  implements SkillCreater
{
  constructor(private readonly skillCreaterRepo: SkillCreaterRepo) {
    super()
  }

  async create(params: SkillCreaterParams): Promise<Skill> {
    try {
      const data = await this.skillCreaterRepo.create(params)

      return this.adapt(data)
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
