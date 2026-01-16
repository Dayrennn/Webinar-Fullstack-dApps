import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Konfigurasi Swagger dengan nama peserta
  const config = new DocumentBuilder()
    .setTitle('Avalanche dApp Backend')
    .setDescription(
      'API untuk membaca data smart contract\n\nPeserta: Rafly Ramandha Kusuma\nNIM: 221011400035',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
