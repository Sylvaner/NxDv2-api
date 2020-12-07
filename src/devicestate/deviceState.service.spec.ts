import { Test, TestingModule } from '@nestjs/testing';
import { DeviceStateService } from './deviceState.service';

describe('DeviceService', () => {
  let service: DeviceStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceStateService],
    }).compile();

    service = module.get<DeviceStateService>(DeviceStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
