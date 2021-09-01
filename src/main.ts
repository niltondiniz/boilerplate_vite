import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config'
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { cors: true, logger });

  app.useGlobalPipes(new ValidationPipe({transform: true})); //aqui estou habilitando um pipe para minha aplicação
  //pipes são executados em um momento antes de executar o endpoint, ou seja antes de chegar em nossos controladores, 
  //são utilizados normalmente para validação
  // ou transformaçao de dados, em nosso caso vamos criar validações;

  app.connectMicroservice({
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupID: 'my-consumer-' + Math.random(), 
      }
    }
  });

  //Configuracao do Swagger - Header
  const config = new DocumentBuilder()
    .setTitle('BoilerPlate')
    .setDescription( 'informar descricao')
    .setVersion('1.1')
    .addTag('Kafka')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('Iniciando microserviços');
  await app.startAllMicroservices();
  console.log('Iniciando aplicação na porta 3000');
  await app.listen(3000);
}
bootstrap();
