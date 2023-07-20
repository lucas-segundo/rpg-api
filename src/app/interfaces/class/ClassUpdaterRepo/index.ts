import { Class } from 'domain/models/Class'
import {
  ClassUpdaterIdentifier,
  ClassUpdaterParams,
} from 'domain/useCases/class/ClassUpdater'

export interface ClassUpdaterRepo {
  update(
    identifier: ClassUpdaterIdentifier,
    params: ClassUpdaterParams
  ): Promise<Class>
}
