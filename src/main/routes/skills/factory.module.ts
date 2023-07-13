import { ModuleMetadata } from '@nestjs/common'
import { makeSkillCreaterController } from 'main/factories/controllers/skill/skillCreater'
import { makeSkillReaderController } from 'main/factories/controllers/skill/skillReader'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { SkillReaderController } from 'presentation/controllers/skill/SkillReader'
import { SkillsController } from './skills.controller'

export const makeSkillsModule = (): ModuleMetadata => ({
  controllers: [SkillsController],
  providers: [
    {
      provide: SkillCreaterController,
      useFactory: () => makeSkillCreaterController(),
    },
    {
      provide: SkillReaderController,
      useFactory: () => makeSkillReaderController(),
    },
  ],
})
