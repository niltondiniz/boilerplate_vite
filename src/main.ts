
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config'
import { KafkaConfig } from './configs/kafka.config'

import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';


async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { cors: true, logger });

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });


  console.log(`ambiente:${process.env.NODE_ENV}`);
  console.log(process.env.API_PORT);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KafkaConfig.broker],
      },
      consumer: {
        groupID: KafkaConfig.consumer.groupId, 
      }
    }
  });

  //Configuracao do Swagger - Header
  const config = new DocumentBuilder()
    .setTitle('BoilerPlate')
    .setDescription( 'informar descricao')
    .setVersion('1.0')
    .addTag('Kafka')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
