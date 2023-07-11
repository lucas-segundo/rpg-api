import { Class } from 'domain/models/Class'

export interface ClassUpdaterParams extends Partial<Omit<Class, 'id'>> {}

export interface ClassUpdaterIdentifier {
  id: number
}

export interface ClassUpdater {
  update(
    identifier: ClassUpdaterIdentifier,
    params: ClassUpdaterParams
  ): Promise<Class>
}
