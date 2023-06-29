import { Module } from '@nestjs/common'
import { makeClassModule } from './factory.module'

@Module(makeClassModule())
export class ClassModule {}
