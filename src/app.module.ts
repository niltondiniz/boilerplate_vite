import { ConfigModule } from '@nestjs/config';
import { CorridaModule } from './api/corrida/corrida.module';
import { CorridaController } from './api/corrida/corrida.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerInterceptor } from './interceptors/logger.interceptor'; //importo meu interceptador
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Consumercontroller } from './consumer/consumer.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `./env/${ENV}.env`, isGlobal: true}), //configuracao do arquivo de configuracoes
    CorridaModule, 
    TerminusModule, 
    WinstonModule.forRoot(winstonConfig),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["broker:29092"],
          },
          consumer: {
            groupId: 'my-consumer-' + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [
     AppController, Consumercontroller, HealthController],
  providers: [AppService,
      {
        provide: APP_INTERCEPTOR, //aqui adiciono um provedor que será provido de um interceptador
        useClass: LoggerInterceptor, //que este interceptador será a nossa classe LoggerInterceptor
      },
    ],
})
export class AppModule { }
