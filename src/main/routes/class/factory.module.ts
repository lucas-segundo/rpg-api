import { ModuleMetadata } from '@nestjs/common'
import { makeClassCreaterController } from 'main/factories/controllers/classCreater'
import { makeClassReaderController } from 'main/factories/controllers/classReader'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassReaderController } from 'presentation/controllers/ClassReader'
import { ClassController } from './class.controller'

export const makeClassModule = (): ModuleMetadata => ({
  controllers: [ClassController],
  providers: [
    {
      provide: ClassCreaterController,
      useFactory: () => makeClassCreaterController(),
    },
    {
      provide: ClassReaderController,
      useFactory: () => makeClassReaderController(),
    },
  ],
})
