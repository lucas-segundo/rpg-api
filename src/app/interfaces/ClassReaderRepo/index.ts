import { Class } from 'domain/models/Class'

export interface ClassReaderRepoResult extends Class {}

export interface ClassReaderRepoParams {
  id: number
}

export interface ClassReaderRepo {
  read(params: ClassReaderRepoParams): Promise<ClassReaderRepoResult>
}
