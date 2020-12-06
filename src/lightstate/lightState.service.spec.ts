import { Test, TestingModule } from '@nestjs/testing';
import { LightStateService } from './lightState.service';

describe('LightService', () => {
  let service: LightStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightStateService],
    }).compile();

    service = module.get<LightStateService>(LightStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
