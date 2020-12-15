import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { DeviceStateService } from './deviceState.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('device')
@Controller('device')
export class DeviceStateController {
  constructor(private deviceStateService: DeviceStateService) { }

  @Get('/:deviceId/state')
  async findById(@Res() res, @Param('deviceId') deviceId: string) {
    const deviceState = await this.deviceStateService.findByObjectId(deviceId);
    return res.status(HttpStatus.OK).json(
      deviceState
    )
  }
}
