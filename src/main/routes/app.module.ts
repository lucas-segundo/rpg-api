import { Module } from '@nestjs/common'
import { ClassModule } from './class/class.module'

@Module({
  imports: [ClassModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
