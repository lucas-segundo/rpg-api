import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'
import { ClassCreaterParams } from 'domain/useCases/class/ClassCreater'
import { ClassUpdaterParams } from 'domain/useCases/class/ClassUpdater'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/class/ClassCreater'
import { ClassDeleterController } from 'presentation/controllers/class/ClassDeleter'
import { ClassReaderController } from 'presentation/controllers/class/ClassReader'
import { ClassUpdaterController } from 'presentation/controllers/class/ClassUpdater'

import { handleResponse } from '../utils/handleResponse'

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classCreaterController: ClassCreaterController,
    private readonly classReaderController: ClassReaderController,
    private readonly classUpdaterController: ClassUpdaterController,
    private readonly classDeleterController: ClassDeleterController
  ) {}

  @Post()
  async create(@Body() params: ClassCreaterParams, @Res() res: Response) {
    const result = await this.classCreaterController.handle(params)

    return handleResponse(res, result)
  }

  @Get(':id')
  async readOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.classReaderController.handle({
      id: Number(id),
    })

    return handleResponse(res, result)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() params: ClassUpdaterParams,
    @Res() res: Response
  ) {
    const result = await this.classUpdaterController.handle({
      identifier: {
        id: Number(id),
      },
      params,
    })

    return handleResponse(res, result)
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.classDeleterController.handle({
      id: Number(id),
    })

    return handleResponse(res, result)
  }
}
