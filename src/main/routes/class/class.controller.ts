import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassReaderController } from 'presentation/controllers/ClassReader'

import { handleResponse } from '../utils/handleResponse'
import { CreateClassDto } from './dto/CreateClass'

@Controller('class')
export class ClassController {
  constructor(
    private readonly classCreaterController: ClassCreaterController,
    private readonly classReaderController: ClassReaderController
  ) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
    const result = await this.classCreaterController.handle(createClassDto)

    return handleResponse(res, result)
  }

  @Get(':id')
  async readOne(@Param('id') id: number, @Res() res: Response) {
    return this.classReaderController.handle({
      id,
    })
  }
}
