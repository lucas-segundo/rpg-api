import { ClassRepo } from 'app/models/ClassRepo'
import { ClassDeleterParams } from 'domain/useCases/ClassDeleter'

export interface ClassDeleterRepoParams extends ClassDeleterParams {}

export interface ClassDeleterRepo {
  delete(params: ClassDeleterRepoParams): Promise<ClassRepo>
}
