import axios from 'axios';
import { CreateScenarioDTO } from 'src/scenario/dto/scenario.dto';
import NodeRedModels from './NodeRedModels';

const MQTT_NODE_ID = '77777777.777777';

interface NodeRedNode {
  id?: string;
  name?: string;
  type: string;
  topic?: string;
  label?: string;
  disabled?: boolean;
  datatype?: string;
  template?: string;
  field?: string;
  fieldType?: string;
  format?: string;
  syntax?: string;
  output?: string;
  qos?: string;
  broker?: string;
  x?: number;
  y?: number;
  z?: string;
  wires?: string[][];
}

export default class NodeRedConnector {
  private static instance: NodeRedConnector;

  private connected = false;

  private baseNodeRedServerUrl = '';

  // eslint-disable-next-line prettier/prettier
  private constructor() { }

  static getInstance(): NodeRedConnector {
    if (NodeRedConnector.instance === undefined) {
      NodeRedConnector.instance = new NodeRedConnector();
    }
    return NodeRedConnector.instance;
  }

  private post(path: string, data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(this.baseNodeRedServerUrl + path, data, {
          headers: { 'Node-RED-API-Version': 'v2' },
        })
        .then((result) => {
          if (result.status === 200) {
            resolve(result.data);
          } else {
            reject();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  connect(nodeRedUrl: string) {
    this.baseNodeRedServerUrl = nodeRedUrl;
    this.connected = true;
  }

  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Code from node-red source code
   */
  genId(): string {
    return (1 + Math.random() * 4294967295).toString(16);
  }

  createTabNode(label: string): NodeRedNode {
    return {
      id: this.genId(),
      label,
      type: 'tab',
      disabled: false,
    };
  }

  fillNodeData(rawNode: NodeRedNode): NodeRedNode {
    const result = rawNode;
    switch (rawNode.type) {
      case 'mqtt in':
      case 'mqtt out':
        result.qos = '2';
        result.broker = MQTT_NODE_ID;
        result.datatype = 'auto';
        break;
      case 'template':
        result.field = 'payload';
        result.fieldType = 'msg';
        result.format = 'handlebars';
        result.syntax = 'mustache';
        break;
    }
    return result;
  }

  saveFlow(name: string, flow: NodeRedNode[]) {
    //const flowToSave: NodeRedNode[] = [];
    /*
    const baseId = this.genId();
    for (const [index, rawNode] of flow.entries()) {
      rawNode.id = this.genId();
      rawNode.x = 150 + index * 150;
      rawNode.y = 200;
      rawNode.z = baseId;
      flowToSave.push(this.fillNodeData(rawNode));
    }
    // Add wires
    for (let i = 0; i < flowToSave.length - 1; ++i) {
      flowToSave[i].wires = [[flowToSave[i + 1].id!]];
    }
    */
    const objectToSave = {
      id: this.genId(),
      label: name,
      nodes: flow,
      configs: [],
    };
    this.post('/flow', objectToSave)
      .then((result) => {
        return 'success';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getSwitchConditionCode(
    conditionCode: string,
    conditionValue: string,
  ): any {
    if (
      (conditionValue === 'true' || conditionValue === 'false') &&
      conditionCode === '=='
    ) {
      return {
        t: conditionValue,
      };
    } else {
      const conditionMap = {
        '<': 'lt',
        '<=': 'lte',
        '>': 'gt',
        '>=': 'gte',
        '==': 'eq',
        '!=': 'neq',
      };
      return {
        t: conditionMap[conditionCode],
        v: conditionValue,
        vt: 'str', // TODO: A améliorer
      };
    }
  }

  private fillIfThenModel(createScenarioDto: CreateScenarioDTO): NodeRedNode[] {
    const flow = Object.assign([], NodeRedModels['if-then']);
    let nextNodeId = this.genId();
    const flowId = this.genId();
    for (const [_, rawNode] of flow.entries()) {
      rawNode.id = nextNodeId;
      rawNode.z = flowId;
      nextNodeId = this.genId();
      if (rawNode.wires.length > 0) {
        rawNode.wires[0][0] = nextNodeId;
      }
    }
    flow[0].name = createScenarioDto.triggerDevice;
    flow[0].topic =
      createScenarioDto.triggerCapability.capabilityData.get.topic;
    flow[0].broker = MQTT_NODE_ID;
    if (
      createScenarioDto.triggerCapability.capabilityData.get.format !== 'json'
    ) {
      flow[0].datatype = 'json';
    }

    flow[1].name =
      createScenarioDto.triggerCapability.name +
      createScenarioDto.triggerCondition +
      createScenarioDto.triggerValue;
    if (createScenarioDto.triggerCapability.capabilityData.get.format === 'json') {
      flow[1].property =
          'payload.' + createScenarioDto.triggerCapability.capabilityData.get.path;
    } else {
      flow[1].property = 'payload';
    }
    flow[1].rules.push(
      this.getSwitchConditionCode(
        createScenarioDto.triggerCondition,
        createScenarioDto.triggerValue,
      ),
    );
    flow[2].name =
        createScenarioDto.actionCapability.name +
        ': ' +
        createScenarioDto.actionValue;
    if (createScenarioDto.actionCapability.capabilityData.set.format === 'json') {
      flow[2].template =
          '{\n  "' +
          createScenarioDto.actionCapability.capabilityData.set.path +
          '": ' +
          createScenarioDto.actionValue +
          '\n}';
    } else {
      flow[2].template = createScenarioDto.actionValue;
      flow[2].syntax = 'plan';
    }
    flow[3].name = createScenarioDto.actionDevice;
    flow[3].topic = createScenarioDto.actionCapability.capabilityData.set.topic;
    flow[3].broker = MQTT_NODE_ID;
    return flow;
  }

  public addScenario(createScenarioDto: CreateScenarioDTO) {
    if (createScenarioDto.model === 'if-then') {
      const flow = this.fillIfThenModel(createScenarioDto);
      this.saveFlow(createScenarioDto.name, flow);
    }
  }
}
