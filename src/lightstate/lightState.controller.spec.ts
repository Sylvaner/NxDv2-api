import { Test, TestingModule } from '@nestjs/testing';
import { LightStateController } from './lightState.controller';

describe('LightStateController', () => {
  let controller: LightStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightStateController],
    }).compile();

    controller = module.get<LightStateController>(LightStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
