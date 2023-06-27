import { Class } from 'domain/models/Class'

export interface ClassCreaterParams {
  title: string
}

export interface ClassCreater {
  create(params: ClassCreaterParams): Promise<Class>
}
