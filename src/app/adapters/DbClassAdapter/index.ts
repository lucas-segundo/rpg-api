import { ClassRepo } from 'app/models/ClassRepo'
import { Class } from 'domain/models/Class'

export abstract class DbClassModelAdapter {
  adapt({ id, title, deletedAt }: ClassRepo): Class {
    return {
      id,
      title,
      deletedAt,
    }
  }
}
