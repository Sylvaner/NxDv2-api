import { Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) { }

  @Get('/')
  async findAll(@Res() res) {
    const devices = await this.deviceService.findAll();
    return res.status(HttpStatus.OK).json(
      devices
    )
  }

  @Get('/:deviceId')
  async findById(@Res() res, @Param('deviceId') deviceId) {
    const device = await this.deviceService.findById(deviceId);
    if (!device) throw new NotFoundException(device);
    return res.status(HttpStatus.OK).json(
      device
    )
  }

  @Put('/:deviceId/zone/:zoneId')
  async linkToSoze(@Res() res, @Param('deviceId') deviceId: string, @Param('zoneId') zoneId: string) {
    const updatedDevice = await this.deviceService.linkToZone(deviceId, zoneId);
    if (!updatedDevice) throw new NotFoundException(deviceId);
    return res.status(HttpStatus.OK).json(
      updatedDevice
    )
  }
}
