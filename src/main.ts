import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import NodeRedConnector from './services/NodeRedConnector';
import * as mongoose from 'mongoose';

/**
 * DEBUG MODE
 */
//mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
NodeRedConnector.getInstance().connect('http://localhost:1880')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('NextDom API')
    .setDescription('Description')
    .setVersion('1.0')
    .addTag('nextdom')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
