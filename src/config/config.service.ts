import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { MqttModuleOptions } from "nest-mqtt";

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k));
    return this;
  }

  public getMongooseModule(connectionName: string): DynamicModule {
    let database = this.getValue('DB_DATABASE');
    if (connectionName === 'nextdomstate') {
      database = this.getValue('DB_STATE_DATABASE');
    }
    return MongooseModule.forRoot(
      `mongodb://${this.getValue('DB_USER')}:${this.getValue('DB_PASSWORD')}@${this.getValue('DB_HOST')}/${database}`,
      {
        connectionName
      });
  }

  public getMqttConfig(): MqttModuleOptions {
    return {
      host: this.getValue('MQTT_HOST'),
      username: this.getValue('MQTT_USER'),
      password: this.getValue('MQTT_PASSWORD')
    }
  }

  public getNodeRedConfig() {
      return {
          host: this.getValue('NODERED_HOST'),
          port: this.getValue('NODERED_PORT')
      }
  }
}

function parseConfigFile() {
  if (fs.existsSync(`./.env`)) {
    return dotenv.parse(fs.readFileSync(`./.env`));
  } else if (fs.existsSync(`../.env`)) {
    return dotenv.parse(fs.readFileSync(`../.env`));
  } else if (fs.existsSync('/etc/nextdom/nextdom.conf')) {
    console.log('nextdom.conf');
    return dotenv.parse(fs.readFileSync('/etc/nextdom/nextdom.conf'));
  }
}

const envContent = parseConfigFile();
const configService = new ConfigService(envContent)
  .ensureValues([
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DATABASE',
    'DB_STATE_DATABASE',
    'MQTT_HOST',
    'MQTT_USER',
    'MQTT_PASSWORD',
    'NODERED_HOST',
    'NODERED_PORT'
  ]);

export { configService };