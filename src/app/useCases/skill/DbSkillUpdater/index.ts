import { SkillUpdaterRepo } from 'app/interfaces/skill/SkillUpdaterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillUpdater,
  SkillUpdaterIdentifier,
  SkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater'

export class DbSkillUpdater implements SkillUpdater {
  constructor(private readonly SkillUpdaterRepo: SkillUpdaterRepo) {}

  async update(
    identifier: SkillUpdaterIdentifier,
    params: SkillUpdaterParams
  ): Promise<Skill> {
    try {
      const data = await this.SkillUpdaterRepo.update(identifier, params)

      return data
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
