import { SkillReaderRepo } from 'app/interfaces/skill/SkillReaderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillReader,
  SkillReaderParams,
} from 'domain/useCases/skill/SkillReader'
import { DbSkillModelAdapter } from '../../../adapters/DbSkillAdapter'

export class DbSkillReader extends DbSkillModelAdapter implements SkillReader {
  constructor(private readonly skillReaderRepo: SkillReaderRepo) {
    super()
  }

  async read(params: SkillReaderParams): Promise<Skill | null> {
    try {
      const data = await this.skillReaderRepo.read(params)

      return data && this.adapt(data)
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
