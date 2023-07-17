import { SkillUpdaterRepo } from 'app/interfaces/skill/SkillUpdaterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillUpdater,
  SkillUpdaterIdentifier,
  SkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater'
import { DbSkillModelAdapter } from '../../../adapters/DbSkillAdapter'

export class DbSkillUpdater
  extends DbSkillModelAdapter
  implements SkillUpdater
{
  constructor(private readonly SkillUpdaterRepo: SkillUpdaterRepo) {
    super()
  }

  async update(
    identifier: SkillUpdaterIdentifier,
    params: SkillUpdaterParams
  ): Promise<Skill> {
    try {
      const data = await this.SkillUpdaterRepo.update(identifier, params)

      return this.adapt(data)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
