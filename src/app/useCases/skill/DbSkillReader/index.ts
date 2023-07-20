import { SkillReaderRepo } from 'app/interfaces/skill/SkillReaderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Skill } from 'domain/models/Skill'
import {
  SkillReader,
  SkillReaderParams,
} from 'domain/useCases/skill/SkillReader'

export class DbSkillReader implements SkillReader {
  constructor(private readonly skillReaderRepo: SkillReaderRepo) {}

  async read(params: SkillReaderParams): Promise<Skill | null> {
    try {
      const data = await this.skillReaderRepo.read(params)

      return data
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
