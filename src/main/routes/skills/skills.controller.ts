import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'

import { handleResponse } from '../utils/handleResponse'
import { CreateSkillDto } from './dto/CreateSkill'

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly classCreaterController: SkillCreaterController
  ) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto, @Res() res: Response) {
    const result = await this.classCreaterController.handle(createSkillDto)

    return handleResponse(res, result)
  }
}
