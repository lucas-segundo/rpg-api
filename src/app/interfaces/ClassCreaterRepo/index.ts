import { Class } from 'domain/models/Class'

export interface ClassCreaterRepoResult extends Class {}

export interface ClassCreaterRepoParams {
  title: string
}

export interface ClassCreaterRepo {
  create(params: ClassCreaterRepoParams): Promise<ClassCreaterRepoResult>
}
