import { ClassRepo } from 'app/models/ClassRepo'

export interface ClassCreaterRepoParams {
  title: string
}

export interface ClassCreaterRepo {
  create(params: ClassCreaterRepoParams): Promise<ClassRepo>
}
