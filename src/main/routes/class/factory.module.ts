import { ModuleMetadata } from '@nestjs/common'
import { makeClassCreaterController } from 'main/factories/controllers/classCreater'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassController } from './class.controller'

export const makeClassModule = (): ModuleMetadata => ({
  controllers: [ClassController],
  providers: [
    {
      provide: ClassCreaterController,
      useFactory: () => makeClassCreaterController(),
    },
  ],
})
