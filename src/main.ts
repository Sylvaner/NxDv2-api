import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import NodeRedConnector from './services/NodeRedConnector';
import * as mongoose from 'mongoose';
import { configService } from './config/config.service';

/**
 * DEBUG MODE
 */
//mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

const nodeRedConfig = configService.getNodeRedConfig();
NodeRedConnector.getInstance().connect(`http://${nodeRedConfig.host}:${nodeRedConfig.port}`)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('NextDom API')
    .setDescription('Description')
    .setVersion('1.0')
    .addTag('nextdom')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/doc', app, document);
  await app.listen(3000);
}
bootstrap();
