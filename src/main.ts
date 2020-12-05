import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * DEBUG MODE
 */
import * as mongoose from 'mongoose';
mongoose.set('debug', true);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
