import { ClassRepo } from 'app/models/ClassRepo'
import { ClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder'

export interface ClassSkillAdderRepoParams extends ClassSkillAdderParams {}

export interface ClassSkillAdderRepo {
  add(params: ClassSkillAdderRepoParams): Promise<ClassRepo>
}
