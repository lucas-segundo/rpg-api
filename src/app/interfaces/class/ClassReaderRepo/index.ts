import { ClassRepo } from 'app/models/ClassRepo'

export interface ClassReaderRepoParams {
  id: number
}

export interface ClassReaderRepo {
  read(params: ClassReaderRepoParams): Promise<ClassRepo | null>
}
