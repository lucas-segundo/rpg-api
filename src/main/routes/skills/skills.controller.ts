import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common'
import { SkillCreaterParams } from 'domain/useCases/skill/SkillCreater'
import { SkillUpdaterParams } from 'domain/useCases/skill/SkillUpdater'
import { Response } from 'express'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { SkillReaderController } from 'presentation/controllers/skill/SkillReader'
import { SkillUpdaterController } from 'presentation/controllers/skill/SkillUpdater'

import { handleResponse } from '../utils/handleResponse'

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillCreaterController: SkillCreaterController,
    private readonly skillReaderController: SkillReaderController,
    private readonly skillUpdaterController: SkillUpdaterController
  ) {}

  @Post()
  async create(@Body() params: SkillCreaterParams, @Res() res: Response) {
    const result = await this.skillCreaterController.handle(params)

    return handleResponse(res, result)
  }

  @Get(':id')
  async read(@Param('id') id: string, @Res() res: Response) {
    const result = await this.skillReaderController.handle({
      id: Number(id),
    })

    return handleResponse(res, result)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() params: SkillUpdaterParams,
    @Res() res: Response
  ) {
    const result = await this.skillUpdaterController.handle({
      identifier: {
        id: Number(id),
      },
      params,
    })

    return handleResponse(res, result)
  }
}
