import axios from 'axios';
import { CreateScenarioDTO } from 'src/scenario/dto/scenario.dto';
import { Scenario } from 'src/scenario/interfaces/scenario.interface';

const MQTT_NODE_ID = '77777777.777777';

/*
interface NodeRedGlobalFlow {
  id: string,
  configs: NodeRedNode[]
}
*/

interface NodeRedNode {
  id?: string,
  name?: string,
  type: string,
  topic?: string,
  label?: string,
  disabled?: boolean,
  datatype?: string,
  template?: string,
  field?: string,
  fieldType?: string,
  format?: string,
  syntax?: string,
  output?: string,
  qos?: string,
  broker?: string,
  x?: number,
  y?: number,
  z?: string,
  wires?: string[][]
}

export default class NodeRedConnector {
  private static instance: NodeRedConnector;

  //  private mqttConfigNode: NodeRedNode = { type: '' };

  private connected: boolean = false;

  private baseNodeRedServerUrl: string = '';

  private revisionCode: string = '';

  private constructor() { }

  static getInstance(): NodeRedConnector {
    if (NodeRedConnector.instance === undefined) {
      NodeRedConnector.instance = new NodeRedConnector()
    }
    return NodeRedConnector.instance;
  }

  public getRevisionCode(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.get('/flows').then(result => {
        if (!result.hasOwnProperty('rev')) {
          reject();
        }
        this.revisionCode = result.rev;
        resolve(this.revisionCode);
      }).catch(_ => {
        reject();
      });
    });
  }

  private get(path: string): Promise<any> {
    return new Promise<object>((resolve, reject) => {
      axios.get(this.baseNodeRedServerUrl + path, { headers: { 'Node-RED-API-Version': 'v2' } }).then((result) => {
        if (result.status === 200) {
          resolve(result.data)
        }
        else {
          reject();
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  public post(path: string, data: object): Promise<any> {
    return new Promise<object>((resolve, reject) => {
      axios.post(this.baseNodeRedServerUrl + path, data, { headers: { 'Node-RED-API-Version': 'v2' } }).then((result) => {
        if (result.status === 200) {
          resolve(result.data)
        }
        else {
          reject();
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  /*
  readConfigFromGlobalFlow(globalFlowResponse: NodeRedGlobalFlow): boolean {
    if (globalFlowResponse.hasOwnProperty('configs')) {
      const filteredConfig = globalFlowResponse.configs.filter(config => config.id === MQTT_NODE_ID);
      if (filteredConfig.length === 1) {
        this.mqttConfigNode = filteredConfig[0];
        return true;
      }
    }
    return false;
  }
  */

  connect(nodeRedUrl: string) {
    this.baseNodeRedServerUrl = nodeRedUrl;
    this.connected = true;
    /*
    this.get('/flow/global').then(_ => {
      //      if (this.readConfigFromGlobalFlow(result as NodeRedGlobalFlow)) {
      this.connected = true;
      this.saveFlow("TTT", [
        {
          name: 'Input',
          type: 'mqtt in',
          topic: 'phue/lights/2'
        },
        {
          name: 'Action',
          type: 'template',
          template: '{\n  \'on\': true\n}',
          output: 'json'
        },
        {
          name: 'Output',
          type: 'mqtt out',
          topic: 'phue/lights/2'
        },
      ]);
      */
    /*
    }
    else {
      throw new Error('Unable to read global config flow')
    }
    */
    /*
    }).catch(err => {
      console.error(err)
    })
    */
  }

  isConnected(): boolean {
    return this.connected;
  }

  /**
   * From node-red source code
   */
  genId(): string {
    return (1 + Math.random() * 4294967295).toString(16);
  }

  createTabNode(label: string): NodeRedNode {
    return {
      id: this.genId(),
      label,
      type: 'tab',
      disabled: false
    }
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
    const flowToSave: NodeRedNode[] = [];
    //    const tabNode: NodeRedNode = this.createTabNode(flow.name);
    //flowToSave.push(tabNode);
    const baseId = this.genId();
    let addMqttConfig = false;
    for (const [index, rawNode] of flow.entries()) {
      rawNode.id = this.genId();
      rawNode.x = 150 + index * 150;
      rawNode.y = 200;
      rawNode.z = baseId;
      if (rawNode.type === 'mqtt in' || rawNode.type === 'mqtt out') {
        addMqttConfig = true;
      }
      flowToSave.push(this.fillNodeData(rawNode));
    }
    // Add wires
    for (let i = 0; i < flowToSave.length - 1; ++i) {
      flowToSave[i].wires = [
        [
          flowToSave[i + 1].id!
        ]
      ];
    }
    if (addMqttConfig) {
      //      flowToSave.push(this.mqttConfigNode);
    }
    const objectToSave = {
      id: this.genId(),
      label: name,
      nodes: flowToSave,
      configs: []
    };
    this.post('/flow', objectToSave).then(result => {
      console.log('a');
    }).catch(err => {
      //      console.log(err.response.data);
      console.log(err);
    });

    /*
    this.getRevisionCode().then(revisionCode => {
      console.log(revisionCode);
      console.log(flowToSave);
      const objectToSave = {
        flows: flowToSave,
        rev: revisionCode
      }
      this.post('/flow', objectToSave).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
    });
    */
  }

  public addScenario(createScenarioDto: CreateScenarioDTO) {
    if (createScenarioDto.model === 'if-then') {
      this.saveFlow("TTT", [
        {
          name: createScenarioDto.triggerDevice,
          type: 'mqtt in',
          topic: createScenarioDto.triggerCapability.get.topic
        },
        {
          name: 'Action',
          type: 'template',
          template: '{\n  "on": false\n}',
          output: 'json'
        },
        {
          name: createScenarioDto.actionDevice,
          type: 'mqtt out',
          topic: createScenarioDto.actionCapability.set.topic
        },
      ]);
    }
  }

}
