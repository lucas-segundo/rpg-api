import { ClassSkillAdderRepo } from 'app/interfaces/class/ClassSkillAdderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassSkillAdder,
  ClassSkillAdderParams,
} from 'domain/useCases/class/ClassSkillAdder'

export class DbClassSkillAdder implements ClassSkillAdder {
  constructor(private readonly classSkillAdderRepo: ClassSkillAdderRepo) {}

  async add(params: ClassSkillAdderParams): Promise<Class> {
    try {
      const data = await this.classSkillAdderRepo.add(params)

      return data
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
