import { ModuleMetadata } from '@nestjs/common'
import { makeSkillCreaterController } from 'main/factories/controllers/skill/skillCreater'
import { makeSkillReaderController } from 'main/factories/controllers/skill/skillReader'
import { makeSkillUpdaterController } from 'main/factories/controllers/skill/skillUpdater'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { SkillReaderController } from 'presentation/controllers/skill/SkillReader'
import { SkillUpdaterController } from 'presentation/controllers/skill/SkillUpdater'
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
    {
      provide: SkillUpdaterController,
      useFactory: () => makeSkillUpdaterController(),
    },
  ],
})
