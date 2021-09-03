import { ConfigModule } from '@nestjs/config';
import { CorridaModule } from './api/corrida/corrida.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerInterceptor } from './interceptors/logger.interceptor'; //importo meu interceptador
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Consumercontroller } from './consumer/consumer.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';


import { KafkaConfig } from './configs/kafka.config'

import { FitroDeExcecaoHttp } from './core/filtro-de-excecao-http.filter';
import { TransformaRespostaInterceptor } from './core/http/transforma-resposta.interceptor';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `./env/${ENV}.env`, isGlobal: true}), //configuracao do arquivo de configuracoes
    CorridaModule, 
    TerminusModule, 
    WinstonModule.forRoot(winstonConfig),
    ClientsModule.register([
      {
        name: KafkaConfig.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [KafkaConfig.broker],
          },
          consumer: {
            groupId: KafkaConfig.consumer.groupId,
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
      {
        provide: APP_FILTER,
        useClass: FitroDeExcecaoHttp
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: TransformaRespostaInterceptor
      },
    ],
})
export class AppModule { }
