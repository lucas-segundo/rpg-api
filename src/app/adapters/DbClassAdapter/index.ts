import { ClassRepo } from 'app/models/ClassRepo'
import { Class } from 'domain/models/Class'

export abstract class DbClassModelAdapter {
  adapt({ id, title }: ClassRepo): Class {
    return {
      id,
      title,
    }
  }
}
