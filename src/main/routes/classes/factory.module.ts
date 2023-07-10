import { ModuleMetadata } from '@nestjs/common'
import { makeClassCreaterController } from 'main/factories/controllers/classCreater'
import { makeClassDeleterController } from 'main/factories/controllers/classDeleter'
import { makeClassReaderController } from 'main/factories/controllers/classReader'
import { makeClassUpdaterController } from 'main/factories/controllers/classUpdater'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassDeleterController } from 'presentation/controllers/ClassDeleter'
import { ClassReaderController } from 'presentation/controllers/ClassReader'
import { ClassUpdaterController } from 'presentation/controllers/ClassUpdater'
import { ClassesController } from './classes.controller'

export const makeClassesModule = (): ModuleMetadata => ({
  controllers: [ClassesController],
  providers: [
    {
      provide: ClassCreaterController,
      useFactory: () => makeClassCreaterController(),
    },
    {
      provide: ClassReaderController,
      useFactory: () => makeClassReaderController(),
    },
    {
      provide: ClassUpdaterController,
      useFactory: () => makeClassUpdaterController(),
    },
    {
      provide: ClassDeleterController,
      useFactory: () => makeClassDeleterController(),
    },
  ],
})
