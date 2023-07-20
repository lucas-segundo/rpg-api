import { ClassSkillAdderRepo } from 'app/interfaces/class/ClassSkillAdderRepo'
import { Class } from 'domain/models/Class'
import { ClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder'

import prisma from 'infra/prisma'
import { PrismaClassAdapter } from 'infra/prisma/adapters/ClassAdapter'

export class PrismaClassSkillAdderRepo
  extends PrismaClassAdapter
  implements ClassSkillAdderRepo
{
  async add({ classId, skillId }: ClassSkillAdderParams): Promise<Class> {
    const result = await prisma.classesSkills.create({
      data: {
        classId,
        skillId,
      },
      include: {
        class: {
          include: {
            classesSkills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
    })

    return this.adapt(result.class)
  }
}
