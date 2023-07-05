import { Class } from 'domain/models/Class'

export interface ClassUpdaterParams extends Partial<Omit<Class, 'id'>> {}

export interface ClassUpdater {
  update(params: ClassUpdaterParams): Promise<Class>
}
