import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common'
import { SkillCreaterParams } from 'domain/useCases/skill/SkillCreater'
import { Response } from 'express'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { SkillReaderController } from 'presentation/controllers/skill/SkillReader'

import { handleResponse } from '../utils/handleResponse'

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillCreaterController: SkillCreaterController,
    private readonly skillReaderController: SkillReaderController
  ) {}

  @Post()
  async create(@Body() params: SkillCreaterParams, @Res() res: Response) {
    const result = await this.skillCreaterController.handle(params)

    return handleResponse(res, result)
  }

  @Get(':id')
  async readOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.skillReaderController.handle({
      id: Number(id),
    })

    return handleResponse(res, result)
  }
}
