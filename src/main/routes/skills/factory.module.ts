import { ModuleMetadata } from '@nestjs/common'
import { makeSkillCreaterController } from 'main/factories/controllers/skill/skillCreater'
import { makeSkillDeleterController } from 'main/factories/controllers/skill/skillDeleter'
import { makeSkillReaderController } from 'main/factories/controllers/skill/skillReader'
import { makeSkillUpdaterController } from 'main/factories/controllers/skill/skillUpdater'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { SkillDeleterController } from 'presentation/controllers/skill/SkillDeleter'
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
    {
      provide: SkillDeleterController,
      useFactory: () => makeSkillDeleterController(),
    },
  ],
})
