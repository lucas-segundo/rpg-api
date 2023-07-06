import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common'
import { Response } from 'express'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassReaderController } from 'presentation/controllers/ClassReader'
import { ClassUpdaterController } from 'presentation/controllers/ClassUpdater'

import { handleResponse } from '../utils/handleResponse'
import { CreateClassDto } from './dto/CreateClass'
import { UpdateClassDto } from './dto/UpdateClass'

@Controller('class')
export class ClassController {
  constructor(
    private readonly classCreaterController: ClassCreaterController,
    private readonly classReaderController: ClassReaderController,
    private readonly classUpdaterController: ClassUpdaterController
  ) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
    const result = await this.classCreaterController.handle(createClassDto)

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
    @Body() updateUserDto: UpdateClassDto,
    @Res() res: Response
  ) {
    const result = await this.classUpdaterController.handle({
      identifier: {
        id: Number(id),
      },
      params: updateUserDto,
    })

    return handleResponse(res, result)
  }
}
