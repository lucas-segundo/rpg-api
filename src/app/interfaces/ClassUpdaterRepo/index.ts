import { ClassRepo } from 'app/models/ClassRepo'
import { ClassUpdaterParams } from 'domain/useCases/ClassUpdater'

export interface ClassUpdaterRepoParams extends ClassUpdaterParams {}

export interface ClassUpdaterRepo {
  update(params: ClassUpdaterRepoParams): Promise<ClassRepo>
}
