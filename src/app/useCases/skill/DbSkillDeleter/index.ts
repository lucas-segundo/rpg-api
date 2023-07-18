import { SkillDeleterRepo } from 'app/interfaces/skill/SkillDeleterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillDeleter,
  SkillDeleterParams,
} from 'domain/useCases/skill/SkillDeleter'
import { DbSkillModelAdapter } from '../../../adapters/DbSkillAdapter'

export class DbSkillDeleter
  extends DbSkillModelAdapter
  implements SkillDeleter
{
  constructor(private readonly skillDeleterRepo: SkillDeleterRepo) {
    super()
  }

  async delete(params: SkillDeleterParams): Promise<Skill> {
    try {
      const data = await this.skillDeleterRepo.delete(params)

      return this.adapt(data)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
