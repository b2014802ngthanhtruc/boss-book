import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { ProductModule } from './module/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  await app.listen(3000);
}
bootstrap();
