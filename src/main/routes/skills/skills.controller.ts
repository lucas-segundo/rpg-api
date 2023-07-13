import { Controller, Post, Body, Res } from '@nestjs/common'
import { SkillCreaterParams } from 'domain/useCases/skill/SkillCreater'
import { Response } from 'express'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'

import { handleResponse } from '../utils/handleResponse'

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly classCreaterController: SkillCreaterController
  ) {}

  @Post()
  async create(@Body() params: SkillCreaterParams, @Res() res: Response) {
    const result = await this.classCreaterController.handle(params)

    return handleResponse(res, result)
  }
}
