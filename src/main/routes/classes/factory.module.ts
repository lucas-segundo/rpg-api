import { ModuleMetadata } from '@nestjs/common'
import { makeClassCreaterController } from 'main/factories/controllers/class/classCreater'
import { makeClassDeleterController } from 'main/factories/controllers/class/classDeleter'
import { makeClassReaderController } from 'main/factories/controllers/class/classReader'
import { makeClassUpdaterController } from 'main/factories/controllers/class/classUpdater'
import { ClassCreaterController } from 'presentation/controllers/class/ClassCreater'
import { ClassDeleterController } from 'presentation/controllers/class/ClassDeleter'
import { ClassReaderController } from 'presentation/controllers/class/ClassReader'
import { ClassUpdaterController } from 'presentation/controllers/class/ClassUpdater'
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
