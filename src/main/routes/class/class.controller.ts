import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'

import { handleResponse } from '../utils/handleResponse'
import { CreateClassDto } from './dto/CreateClass'

@Controller('class')
export class ClassController {
  constructor(
    private readonly classCreaterController: ClassCreaterController
  ) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
    const result = await this.classCreaterController.create(createClassDto)

    return handleResponse(res, result)
  }
}
