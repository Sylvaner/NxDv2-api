import { Controller, Post, HttpStatus, Res, Body } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { CreateScenarioDTO } from './dto/scenario.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('scenario')
@Controller('scenario')
export class ScenarioController {
  constructor(private scenarioService: ScenarioService) { }

  @Post('/')
  async create(@Res() res, @Body() createScenarioDTO: CreateScenarioDTO) {
    const result = await this.scenarioService.create(createScenarioDTO);
    return res.status(HttpStatus.OK).json(
      result
    )
  }
}
