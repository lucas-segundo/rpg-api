import { ModuleMetadata } from '@nestjs/common'
import { makeSkillCreaterController } from 'main/factories/controllers/skill/skillCreater'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { SkillsController } from './skills.controller'

export const makeSkillsModule = (): ModuleMetadata => ({
  controllers: [SkillsController],
  providers: [
    {
      provide: SkillCreaterController,
      useFactory: () => makeSkillCreaterController(),
    },
  ],
})
