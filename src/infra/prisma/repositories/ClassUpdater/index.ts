import {
  ClassUpdaterRepo,
  ClassUpdaterRepoParams,
  ClassUpdaterRepoIdentifier,
} from 'app/interfaces/ClassUpdaterRepo'
import { ClassRepo } from 'app/models/ClassRepo'

import prisma from 'infra/prisma'

export class PrismaClassUpdaterRepo implements ClassUpdaterRepo {
  async update(
    { id }: ClassUpdaterRepoIdentifier,
    params: ClassUpdaterRepoParams
  ): Promise<ClassRepo> {
    const result = await prisma.class.update({
      where: {
        id,
      },
      data: params,
    })

    return result
  }
}
