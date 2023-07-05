import { ClassRepo } from 'app/models/ClassRepo'
import {
  ClassUpdaterIdentifier,
  ClassUpdaterParams,
} from 'domain/useCases/ClassUpdater'

export interface ClassUpdaterRepoIdentifier extends ClassUpdaterIdentifier {}
export interface ClassUpdaterRepoParams extends ClassUpdaterParams {}

export interface ClassUpdaterRepo {
  update(
    identifier: ClassUpdaterRepoIdentifier,
    params: ClassUpdaterRepoParams
  ): Promise<ClassRepo>
}
