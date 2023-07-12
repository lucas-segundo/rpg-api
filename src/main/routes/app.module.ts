import { Module } from '@nestjs/common'
import { ClassesModule } from './classes/classes.module'
import { SkillsModule } from './skills/skills.module'

@Module({
  imports: [ClassesModule, SkillsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
