import { Module } from '@nestjs/common';
import { ScenarioController } from './scenario.controller';
import { ScenarioService } from './scenario.service';

@Module({
  imports: [],
  controllers: [ScenarioController],
  providers: [ScenarioService]
})
export class ScenarioModule { }
