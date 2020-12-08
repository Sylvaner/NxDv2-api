import { Controller, Get, Delete, Post, Put, HttpStatus, Param, Res, Body, NotFoundException } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDTO } from './dto/zone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('zone')
@Controller('zone')
export class ZoneController {
  constructor(private zoneService: ZoneService) { }

  @Get('/')
  async findAll(@Res() res) {
    const zones = await this.zoneService.findAll();
    return res.status(HttpStatus.OK).json(
      zones
    )
  }

  @Get('/:zoneId')
  async findById(@Res() res, @Param('zoneId') zoneId) {
    const zone = await this.zoneService.findById(zoneId);
    if (!zone) throw new NotFoundException(zoneId);
    return res.status(HttpStatus.OK).json(
      zone
    )
  }

  @Post('/')
  async create(@Res() res, @Body() createZoneDTO: CreateZoneDTO) {
    const zone = await this.zoneService.create(createZoneDTO);
    return res.status(HttpStatus.OK).json(
      zone
    )
  }

  @Delete('/:zoneId')
  async delete(@Res() res, @Param('zoneId') zoneId) {
    const deletedZone = await this.zoneService.delete(zoneId);
    if (!deletedZone) throw new NotFoundException(zoneId);
    return res.status(HttpStatus.OK).json(
      deletedZone
    )
  }

  @Put('/:zoneId')
  async update(@Res() res, @Body() createZoneDTO: CreateZoneDTO, @Param('zoneId') zoneId) {
    const updatedZone = await this.zoneService.update(zoneId, createZoneDTO);
    if (!updatedZone) throw new NotFoundException(zoneId);
    return res.status(HttpStatus.OK).json(
      updatedZone
    )
  }
}
