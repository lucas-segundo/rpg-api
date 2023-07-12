import { Module } from '@nestjs/common'
import { makeSkillsModule } from './factory.module'

@Module(makeSkillsModule())
export class SkillsModule {}
