import { SkillDeleterRepo } from 'app/interfaces/skill/SkillDeleterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillDeleter,
  SkillDeleterParams,
} from 'domain/useCases/skill/SkillDeleter'

export class DbSkillDeleter implements SkillDeleter {
  constructor(private readonly skillDeleterRepo: SkillDeleterRepo) {}

  async delete(params: SkillDeleterParams): Promise<Skill> {
    try {
      const data = await this.skillDeleterRepo.delete(params)

      return data
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
