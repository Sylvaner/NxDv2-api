import { Controller, Get, Delete, Post, Put, HttpStatus, Param, Res, Body, NotFoundException } from '@nestjs/common';
import { RenderService } from './render.service';
import { CreateRenderDTO } from './dto/render.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('render')
@Controller('render')
export class RenderController {
  constructor(private renderService: RenderService) { }

  @Get('/')
  async findAll(@Res() res) {
    const renders = await this.renderService.findAll();
    return res.status(HttpStatus.OK).json(
      renders
    )
  }

  @Get('/:renderId')
  async findById(@Res() res, @Param('renderId') renderId) {
    const render = await this.renderService.findById(renderId);
    if (!render) throw new NotFoundException(renderId);
    return res.status(HttpStatus.OK).json(
      render
    )
  }

  @Post('/')
  async create(@Res() res, @Body() createRenderDTO: CreateRenderDTO) {
    const render = await this.renderService.create(createRenderDTO);
    return res.status(HttpStatus.OK).json(
      render
    )
  }

  @Delete('/:renderId')
  async delete(@Res() res, @Param('renderId') renderId) {
    const deletedRender = await this.renderService.delete(renderId);
    if (!deletedRender) throw new NotFoundException(renderId);
    return res.status(HttpStatus.OK).json(
      deletedRender
    )
  }

  @Put('/:renderId')
  async update(@Res() res, @Body() createRenderDTO: CreateRenderDTO, @Param('renderId') renderId) {
    const updatedRender = await this.renderService.update(renderId, createRenderDTO);
    if (!updatedRender) throw new NotFoundException(renderId);
    return res.status(HttpStatus.OK).json(
      updatedRender
    )
  }
}
