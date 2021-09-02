
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config'

import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';


import { KafkaConfig } from './configs/kafka.config'

async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { cors: true, logger });

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });



  console.log(`ambiente:${process.env.NODE_ENV}`);
  const apiPort = parseInt( process.env.API_PORT );
  const kafkaBroker =  process.env.KAFKA_BROKER ;
  console.log(`API PORT:: ${apiPort}`);
  console.log(`Kafka Broker:: ${kafkaBroker}`);

  app.connectMicroservice({
    name: KafkaConfig.name,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KafkaConfig.broker],
      },
      consumer: {
        groupId: KafkaConfig.consumer.groupId + Math.random(),
      },
    },
  },);

  //Configuracao do Swagger - Header
  const config = new DocumentBuilder()
    .setTitle('BoilerPlate - MS Pagamento')
    .setDescription( 'informar descricao')
    .setVersion('1.0')
    .addTag('Kafka')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

  await app.startAllMicroservices();
  await app.listen(apiPort);
}
bootstrap();
