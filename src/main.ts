import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { ProductModule } from '../src/product/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  await app.listen(3000);
}
bootstrap();
