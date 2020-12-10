import { Injectable } from '@nestjs/common';
import { CreateScenarioDTO } from './dto/scenario.dto';
import NodeRedConnector from 'src/services/NodeRedConnector';

@Injectable()
export class ScenarioService {
  constructor() { }

  async create(createScenarioDto: CreateScenarioDTO): Promise<string> {
    // TODO: Ajouter un retour
    NodeRedConnector.getInstance().addScenario(createScenarioDto);
    return 'success';
  }
}
