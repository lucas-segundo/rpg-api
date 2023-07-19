import { ClassSkillAdderRepo } from 'app/interfaces/class/ClassSkillAdderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassSkillAdder,
  ClassSkillAdderParams,
} from 'domain/useCases/class/ClassSkillAdder'
import { DbClassModelAdapter } from '../../../adapters/DbClassAdapter'

export class DbClassSkillAdder
  extends DbClassModelAdapter
  implements ClassSkillAdder
{
  constructor(private readonly classSkillAdderRepo: ClassSkillAdderRepo) {
    super()
  }

  async add(params: ClassSkillAdderParams): Promise<Class> {
    try {
      const data = await this.classSkillAdderRepo.add(params)

      return this.adapt(data)
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
