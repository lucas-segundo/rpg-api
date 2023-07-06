import { Module } from '@nestjs/common'
import { makeClassesModule } from './factory.module'

@Module(makeClassesModule())
export class ClassesModule {}
