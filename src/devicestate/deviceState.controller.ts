import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { DeviceStateService } from './deviceState.service';

@Controller('device')
export class DeviceStateController {
  constructor(private deviceStateService: DeviceStateService) { }

  @Get('/:deviceId/state')
  async findById(@Res() res, @Param() params) {
    const deviceState = await this.deviceStateService.findByObjectId(params.deviceId);
    return res.status(HttpStatus.OK).json(
      deviceState
    )
  }
}
